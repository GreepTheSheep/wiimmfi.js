---
description: Rooms API for Mario Kart Wii
---

# MKWii

```javascript
const mkwii = new Wiimmfi.MKWii();
```

Delivers Online services status for Mario Kart Wii.

{% tabs %}
{% tab title="Methods" %}
* [getRooms](mkwii.md#getrooms)
{% endtab %}

{% tab title="Properties" %}
* [options](mkwii.md#options)
* [data](mkwii.md#data)
{% endtab %}
{% endtabs %}

## Methods

### .getRooms\(`[roomName]`\) <a id="getrooms"></a>

| Parameter | Type | Optional | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| roomName | String | Yes | \* | The four-characters room name to look up for |

Returns: `Promise <Array>`

## Properties

### .options

Returns an Object with the options on the API  
Returns: `Promise <Object>`

### .data

Returns all the JSON from the API  
Returns: `Promise <Array>`



