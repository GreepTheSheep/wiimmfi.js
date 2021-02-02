---
description: >-
  CTGP is a competitive patch for Mario Kart Wii that adds +200 custom tracks
  and adds a ranking system to the multiplayer, it uses Wiimmfi online system
---

# CTGPOnline

```javascript
const ctgpOnline = new Wiimmfi.CTGPOnline();
```

Access to the room statistics for [CTGP](http://chadsoft.co.uk/)

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
{% endtabs %}

## Methods

### .getRooms

Get a list of all CTGP rooms at the moment

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



