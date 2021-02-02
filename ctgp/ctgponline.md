---
description: >-
  CTGP is a competitive patch for Mario Kart Wii that adds +200 custom tracks
  and adds a ranking system to the multiplayer, it uses Wiimmfi online system
---

# CTGPOnline

```javascript
const ctgpOnline = new Wiimmfi.CTGPOnline();
```

Access to the room statistics for CTGP

{% hint style="warning" %}
This class is fetched though web scraping. According to the website, this is refreshed every 10 seconds, so please use a `setInterval` every 10 seconds to not flood the website. Thanks
{% endhint %}

{% tabs %}
{% tab title="Methods" %}
* [getRooms](ctgponline.md#getrooms)
* [getRoom](ctgponline.md#getroom-roomid-type)
{% endtab %}

{% tab title="Properties" %}
* [stats](ctgponline.md#stats)
  * ctww\_players
  * cd\_players
  * most\_ctww\_players
  * most\_cd\_players
  * most\_ctww\_rooms
  * most\_cd\_rooms
  * longest\_ctww\_logged
  * longest\_cd\_logged
{% endtab %}

{% tab title="Events" %}
* [roomsUpdate](ctgponline.md#roomsupdate)
* [playersUpdate](ctgponline.md#playersupdate)
* [debug](ctgponline.md#debug)
{% endtab %}
{% endtabs %}

## Methods

### .getRooms\(`[type]`\)

Get a list of all CTGP rooms at the moment

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
      <td style="text-align:left">type</td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">Yes</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p>The type of the room: <code>CTWW </code>or <code>Countdown</code>
        </p>
        <p>If none is set, it takes any type</p>
      </td>
    </tr>
  </tbody>
</table>

Returns: `Promise <Array>`

### .getRoom\(`roomID, [type]`\) <a id="getroom"></a>

Get the data for a specific room

| Parameter | Type | Optional | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| roomID | Number | No |  | The room ID |
| type | String | Yes | `CTWW` | The type of the room: `CTWW` or `Countdown` |

Returns: `Promise <Array>`

## Properties

### .stats

| properties | Returns | Description |
| :--- | :--- | :--- |
| `ctww_players` | `Promise <Number>` | Get actual counter of players in CTWW rooms |
| `cd_players` | `Promise <Number>` | Get actual counter of players in Countdown rooms |
| `most_ctww_players` | `Promise <Number>` | Get the most players ever in CTWW rooms |
| `most_cd_players` | `Promise <Number>` | Get the most players ever in Countdown rooms |
| `most_ctww_rooms` | `Promise <Number>` | Get the most rooms ever in CTWW |
| `most_cd_rooms` | `Promise <Number>` | Get the most rooms ever in Countdown |
| `longest_ctww_logged` | `Promise <String>` | Get the longest logged time ever in CTWW |
| `longest_cd_logged` | `Promise <String>` | Get the longest logged time ever in Countdown |

## Events

### roomsUpdate

Triggered when a new room is created or deleted

| parameter | Type | Description |
| :--- | :--- | :--- |
| oldRooms | Array | The old rooms list |
| newRooms | Array | The new rooms list |

Example:

```javascript
ctgpOnline.on("roomsUpdate", (oldRooms, newRooms)=>{
    console.log("Rooms list has been updated!", newRooms)
})
```

### playersUpdate

Triggered when a player joins or leaves the server

| parameter | Type | Description |
| :--- | :--- | :--- |
| oldPlayers | Array | The old players list |
| newPlayers | Array | The new players list |

### debug

Emitted when there are a debug message

| parameter | Type | Description |
| :--- | :--- | :--- |
| message | String | The debug message |

