---
description: >-
  The leaderboards for CTGP-R is available online at
  https://chadsoft.co.uk/time-trials/
---

# CTGP

```javascript
const CTGP = new Wiimmfi.CTGP()
```

Delivers Time Attacks leaderboard and players data for CTGP

| Parameter | Type | Optional | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| options | Object | Yes |  | The options for this class |
| options.cache | Boolean | Yes | true | Cache the requests to have fastest load |
| options.autoCache | Boolean | Yes | true | Activates automatic caching, it refreshes the cache every determined time |
| options.autoCacheRefresh | Number | Yes | 2 | The number of minutes to start auto refresh cache |

{% tabs %}
{% tab title="Methods" %}
* [getLinks](ctgp.md#getlinks)
{% endtab %}

{% tab title="Properties" %}
* [options](ctgp.md#options)
* [url](ctgp.md#url)
* [links](ctgp.md#links)
{% endtab %}

{% tab title="Events" %}
* [cacheUpdate](ctgp.md#cacheupdate)
* [debug](ctgp.md#debug)
{% endtab %}
{% endtabs %}

## Methods

### getLinks\(\)

Gets an object with API links to go to.

Returns `Promise<Object>`

## Properties

### options

Returns this options object  
Returns `Object`

### url

Returns the API URL

Returns: `String`

### links

Returns an object with all the links included in the API

Returns `Promise<Object>`

## Events

### cacheUpdate

Emitted when the cache was updated

| Properties | Type | Description |
| :--- | :--- | :--- |
| key | String | The key for the cache |
| data | Object | All the data from the cache |

### debug

Emitted when there a debug log

| Properties | Type | Description |
| :--- | :--- | :--- |
| message | String | The debug message |



