---
description: Gets information on a error code on Wiimmfi
---

# getError

Example:

```javascript
Wiimmfi.getError(code).then(result=>{
    console.log('Results for code '+code, result)
    console.log('')
})
.catch(err=>{
    console.error(err)
    console.log('')
})
```

| Parameter | Type | Optional | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| code | String \| Number | No |  | The error code |

Returns `Promise<Object>`

Result:

| key | Description |
| :--- | :--- |
| Class | The general description of this code \(first digit\) |
| Section | The section description of this code \(second digit\) |
| Error | The error of this code \(detailed error message of the code\) |
| Solution | A solution \(if any\) |

Example of result for code 32003

```javascript
{
  Class: { 
    code: '3xxxx',
    description: 'Expanded feature error codes.'
  },
  Section: {
    code: '32xxx',
    description: 'An error occurred during the network update-related processing.'
  },
  Error: {
    code: '32003',
    description: 'Your Wii console memory (NAND) is full.'
  },
  Solution: {
    code: '32003',
    description: 'Please delete channels, savegames or something else.'
  }
}
```

