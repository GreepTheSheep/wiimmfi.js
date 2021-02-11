---
description: Contents the information about the latest Mario Kart Wii Competition
---

# Competitions

```javascript
const competition = new Wiimmfi.Competitions();
```

{% hint style="warning" %}
This class is used though web scraping, be careful to not abuse it!
{% endhint %}

{% tabs %}
{% tab title="Methods" %}
* [getComp\(\)](competitions.md#getcomp-compid)
{% endtab %}

{% tab title="Properties" %}
* [compURL](competitions.md#compurl)
{% endtab %}
{% endtabs %}

## Methods

### getComp\(`[compID]`\)

Gets the information and the leaderboard about a competition

| Parameter | Type | Optional | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| compID | String \| Number | Yes | latest | The Identifier of the competition |

Returns `Promise<Object>`

Example:

```javascript
await competition.getComp()

/* should return:

{
  information: {
    title: 'VS Race on Block Plaza',
    img: 'https://competitions.wiimmfi.de/images/competitions/19.png',
    info: 'Wiimmfi competition #168 (2021-02.2)',
    description: "There's a Time Trial under way on Block Plaza. Pick the best route and avoid oil slicks and Goombas!",
    ends: 'The competition ends on Thursday 18 February 2021, 11:59 PM UTC'
  },
  leaderboard: [
    {
      place: '1st',
      time: '53.630',
      name: 'RUI',
      freindCode: '3570-8262-1806',
      country: 'Portugal',
      driver: 'Funky Kong',
      vehicle: 'Flame Runner',
      controller: 'Classic',
      video: undefined
    }
    [...]
  ]
}

*/
```

## Properties

### compURL

Returns the URL of competitions page

Returns `String`

