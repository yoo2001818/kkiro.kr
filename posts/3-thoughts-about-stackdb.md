---
title: Thoughts about stackdb
published: 2017/01/26 18:16
updated: 2017/01/26 18:16
tags: database, distributed, structure, node.js, javascript
comment: true
---
I was originally planing to build a fully distributed double-entry bookkeeping
program, that doesn't depend on a server at all. But how do I build that stuff?

I've drawn some sketches about the structure then they gave me a conclusion:
I must build purely client-side distributed database in JavaScript. That's the
stackdb.

In this article, I'll share about my thoughts about how I came up with this
idea, how it'll be structured, and how it'll work.

---

# How I came up with this idea
I was thinking of fully distributed system, that can sync each other without
a server. But it's good to back-up the database on the server - we can always
pull them out if we lost the device. Still, it feels creepy to store my
accounting ledgers in someone else's computer. Of course it'd be my server - so
I'm fine - but what about someone else?

So I thought about encrypting then saving the data to server, storing the key
on the client. It's good, but, who manages the data? Who'll resolve the
confliction between two devices? Distributed database with master-master
replication to the rescue.

[CouchDB](http://couchdb.apache.org/) (or
[PouchDB](https://pouchdb.com/) in this case) looked pretty promising, but
it's really complicated to show modification history - not important for
personal use - but it's really important for corporate use, since it can be used
for audit or something. (Not saying that it'll be used in corporates, that's
crazy)

That being said, the structure became something similiar to
[git](https://git-scm.com/). I need version history, merging, distribution.
So I looked for it and found
[Noms](https://github.com/attic-labs/noms). It looks good, but it looks so
complicated and it hasn't matured yet - so I decided to build asimple
distributed and versioned database system.

After designing few concepts about the database, it became
[Redux](http://redux.js.org/) with a replay feature. Maybe I could use
Redux to build the database! ...Maybe.

# Concept
**stackdb** would be a simple database - it'll be separated to 3 parts.

I'm not sure if stackdb is even a database - it stores a list of transactions,
then current state gets built by the view schema.

## Current state
**Current state** stores the current state of the database, usable by the
program. It'll be stored in each client's database. It doesn't get transfered
to other clients though, since it can be easily built using transactions data.

To edit the current state, the client must issue new transaction. The
transaction data varies app to app.

## Transactions
The transaction data. It stores how the data should be modified to process the
request, like a diff file. It'll be shared between each client, and it'll be
merged every time sync occurs. Basically, it's a complete history how the
database was built.

## View schema
**View schema** describes how the 'current state' should be built. It'll read
every transaction on the database then return the current state. Some view
schema can depend on other view schema to save time, thus working as indexes.

Some view schema can be generated temporarily, and they won't get stored in the
database. They'll be 'queries', useful for searching stuff, sorting, etc.

# Syncing
**stackdb** is fully distributed database, that devices are
disconnected from each other almost every time. Thus it needs to provide
reliable syncing mechanism.

Unless each transaction overwrites same field, it can just merge them in
any order. But if not, that's a conflict, and it must be resolved before
doing anything else.

## Transaction list data type
To store transaction list with multiple parents support, we could use
linked list, but that'd be really complicated and slow - furthermore, we should
be able to store them in JSON file. Perhaps it could 'rebase' every conflict,
making only one parent can exist. That way, it can scan the transaction list
much much faster. It'll tamper with the history, though.

The problem is that a rebase occurs, the history breaks and the synchronization
will break if there are more than 3 devices on the database, since devices that
synchronize after rebasing won't know how it is connected.

I need more time to think on that.

## Database locking
The database must be locked while syncing; because the transaction list changes
often. Since it doesn't need to respond immediately, it can wait until the
syncing completes.

## Conflict resolution
Conflict can be resolved by dropping a transaction with lower priority - but
that's bad. Maybe we could the transaction to 'graveyard', and let the user
solve the conflict, since consistency is so important for the bookkeeping
program. But if the user is building fast-paced program like games and stuff -
that's almost impossible.

Conflict resolution part would be separated to these parts, but the program
must specify them to database since the database doesn't know how the
transaction would affect the state.
- Conflict detector
- Transaction score determiner
- Conflict handler
  - It could mark dropped transaction as 'failed', and view schema could detect
    that.
  - It could just remove them from transaction list.
  - It could remove both from transaction list, then mark it as failed.
  - Or it could merge them into one.

### Conflict detector
Conflict detector accepts two branches with common ancestor, and merges them
into linear array, a.k.a. rebasing. It would work in O(n^2) time, or it might
be cheaper. Anyway, It should return merged array and 'rejected' transactions.
Rejected transactions would be passed to conflict handler.

### Conflict handler
Conflict handler receives merged array and rejected transactions.
It should resolve the rejected transactions by its own mechanism, and return
the final merged array. The merged array gets processed by view schema and
the syncing completes.

## Storing current state
We need to reverse the current state in order to perform merging. Since we can't
reverse the state, we must build the state from the beginning if we weren't
storing previous results.
Obviously, we can't store every current state for every transaction, but
we can store 'sync point' for each remote devices, using that for restoring
current state.

# Accessor
Obviously, we can directly access the database if each database runs in the
client, but what if it doesn't?

It needs some kind of protocol for accessing the database. Something like
GraphQL? Maybe? But that's not required for now, since the program I'm
trying to build assumes that every device has its own database.

But if that can't happen, it'll need access protocol. Since it doesn't need that
now, I'm not gonna think about it.

# Signing
Each transaction can be signed in order to verify who has written the
transaction (Thus extermely useful for audit, etc). Since each transaction is
schemaless, this can be easily implemented on the client side.

# Encryption
I said about encryption earlier this article. It needs to support encryption,
and/or 'blind' management of the database.

> So I thought about encrypting then saving the data to server, storing the key
> on the client.

Well, encryption is trivial since it can encrypt the whole database file,
but it needs one feature: blind management of the database. I made up that word,
though.

Well, the concept is this: The server should blindly manage the transaction
logs, without knowing what's inside that. Clients would share the key each
other, but server'll never know the key.

Basic metadata should be known to the server, like the list of registered
clients, Each client's sync position, etc. Other than that, server don't know
everything.

But since it needs to read the transaction logs to merge branches, the client
handles the merging. Thus this'll happen:
1. Lock the database. (Not sure if this is necessary)
2. Download new transactions.
3. Merge the transactions.
4. Upload the merged transactions.
5. Unlock the database.

It's inefficient, but it'll be good for encryption. One catch is that while
merging, merging client can 'hide' a commit from the database. Other than that,
it's fine.

It could prevent hiding by using a signature - thus preventing modification.
Or, it could only change indices then append 'fix transaction' that fixes
error of the database.

# Conclusion
This article is still work in progress. I'll update the article soon.
