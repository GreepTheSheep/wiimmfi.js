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
* [getPlayer](ctgp.md#getplayer-playername)
* [getPlayerLeaderboard](ctgp.md#getplayerleaderboard-player)
* [getTrack](ctgp.md#getplayerleaderboard-player)
* [getLeaderboard](ctgp.md#getleaderboard-track)
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

### getPlayer\(playerName\)

Gets the data of a player

| Parameter | Type | Optional | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| playerName | String | No |  | The name or the player |

Returns `Promise<Object>`

### getPlayerLeaderboard\(player\)

Gets the leaderboard of the player

| Parameter | Type | Optional | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| player | Object | No |  | The player from [getPlayer](ctgp.md#getplayer-playername) |

Example:

```javascript
var playerLeader = await CTGP.getPlayerLeaderboard(await CTGP.getPlayer('Greep'))
console.log(playerLeader)
```

Returns `Promise<Object>`

### getTrack\(trackName, \[category\]\)

Gets the data of a specific track on CTGP

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameter</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Optional</th>
      <th style="text-align:left">Default</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">trackName</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">No</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p>The name or the ID of the track.</p>
        <p>It takes firstly the name, then the ID</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">category</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">Yes</td>
      <td style="text-align:left">no-shortcut</td>
      <td style="text-align:left">
        <p>The category type of the track,</p>
        <p>&quot;no-shortcut&quot;, &quot;shortcut&quot; or &quot;glitch&quot;</p>
        <p>See the &quot;Categories&quot; section <a href="https://chadsoft.co.uk/time-trials/">here</a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

Returns `Promise<Object>`

### getLeaderboard\(track\)

Gets the leaderboard of a specific track

| Parameter | Type | Optional | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| track | Object | No |  | The specific track to get from [getTrack](ctgp.md#gettrack-trackname-category) |

Example:

```javascript
var leader = await CTGP.getLeaderboard(await CTGP.getTrack('Mushroom Gorge'))
console.log(leader)
```

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



