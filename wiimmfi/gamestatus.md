---
description: Gets status on a game in Wiimmfi
---

# GameStatus

```javascript
const gameStats = new Wiimmfi.GameStatus()
```

{% hint style="warning" %}
This class is used though web scraping, be careful to not abuse it!
{% endhint %}

{% tabs %}
{% tab title="Methods" %}
* getAllGames\(\)
{% endtab %}

{% tab title="Properties" %}
* url
{% endtab %}
{% endtabs %}

## Methods

### getAllGames\(\)

Fetches the game list

Returns `Promise<Array>`

Example:

```javascript
const games = await gameStats.getAllGames();

games.find(game => game.name == "Super Smash Bros. Brawl")


/* should returns:

{
  ID: 'RSBJ',
  name: 'Super Smash Bros. Brawl',
  status: 'Full support',
  statusInfo: 'Use RiiConnect24 DNS (164.132.44.106) for spectator mode and submissions.',
  profiles: 85687,
  online: 4,
  logins: '1422 k'
}

*/
```

## Properties

### url

Returns the full URL of the game list

Returns `String`

