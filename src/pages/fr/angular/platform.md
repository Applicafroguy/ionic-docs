---
previousText: 'Configuration'
previousUrl: '/fr/docs/angular/config'
nextText: 'Test'
nextUrl: '/fr/docs/angular/testing'
contributors:
  - liamdebeasi
---


# Plateforme

The Platform service can be used to get information about your current device. You can get all of the platforms associated with the device using the `platforms` method, including whether the app is being viewed from a tablet, if it's on a mobile device or browser, and the exact platform (iOS, Android, etc). You can also get the orientation of the device, if it uses right-to-left language direction, and much much more. With this information you can completely customize your app to fit any device.

## Utilisation

```typescript
import { Platform } from '@ionic/angular';

@Component({...})
export class MyPage {
  constructor(public platform: Platform) {

  }
}
```

## Méthodes

### `is(platformName: Platforms) => boolean`

Depending on the platform the user is on, `is(platformName)` will return true or false. Note that the same app can return true for more than one platform name. For example, an app running from an iPad would return true for the platform names: `mobile`, `ios`, `ipad`, and `tablet`. Additionally, if the app was running from Cordova then `cordova` would be true.

#### Parameters

| Nom            | Type        | Description                                                                                                                                                  |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `platformName` | `Platforms` | Nom de la plateforme. Les options disponibles sont : android, capacitor, cordova, desktop, electron, hybrid, ios, ipad, iphone, mobile, phablet, pwa, tablet |

#### Platformes

Vous trouverez ci-dessous une liste de toutes les valeurs possibles pour la plateforme ainsi que les descriptions correspondantes.

| Nom de la plateforme | Description                                           |
| -------------------- | ----------------------------------------------------- |
| android              | un appareil fonctionnant sous Android                 |
| capacitor            | un appareil exécutant Capacitor                       |
| cordova              | un appareil exécutant Cordova                         |
| desktop              | un appareil de bureau                                 |
| electron             | un appareil de bureau exécutant Electron              |
| hybrid               | un appareil exécutant Capacitor ou Cordova            |
| ios                  | un appareil fonctionnant sous iOS                     |
| ipad                 | un iPad                                               |
| iphone               | un iPhone                                             |
| mobile               | un appareil mobile                                    |
| mobileweb            | un navigateur Web fonctionnant sur un appareil mobile |
| phablet              | une phablette                                         |
| pwa                  | une application web progressive                       |
| tablet               | une tablette                                          |

### `platforms() => string[]`

Selon le périphérique sur lequel vous êtes, `platforms` peut renvoyer plusieurs valeurs. Chaque valeur possible est une hiérarchie de plateformes. Par exemple, sur un iPhone, il renvoie `mobile`, `ios`, et `iphone`.

### `ready() => Promise<string>`

Renvoie une promesse lorsque la plateforme est prête et que des fonctionnalités natives peuvent être appelées. Si l'application fonctionne à partir d'un navigateur Web, alors la promesse sera résolue lorsque le DOM sera prêt. Lorsque l'application est en cours d'exécution à partir d'un moteur d'application tel que Cordova, alors la promesse se résoudra quand Cordova déclenchera l'événement `deviceready`. La valeur résolue est `readySource`, qui indique la plateforme qui a été utilisée.

Par exemple, lorsque Cordova est prêt, la source prête qui est résolue est `cordova`. La valeur de source prête par défaut sera `dom`. Le `readySource` est utile si une logique différente doit s'exécuter en fonction de la plateforme depuis laquelle l'application est en cours d'exécution. Par exemple, seul Capacitor et Cordova peuvent exécuter le plugin de la barre d'état, de sorte que le Web ne doit pas exécuter la logique du plugin de la barre d'état.

### `isRTL() => boolean`

Retourne si cette application utilise la direction de la langue de droite à gauche ou non. We recommend the app's `index.html` file already has the correct `dir` attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`. [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)

### `isLandscape() => boolean`

Returns `true` if the app is in landscape mode.

### `isPortrait() => boolean`

Returns `true` if the app is in portrait mode.

### `width() => number`

Gets the width of the platform's viewport using `window.innerWidth`.

### `height() => number`

Gets the height of the platform's viewport using `window.innerHeight`.

### `url() => string`

Get the current url.

### `testUserAgent(expression: string) => boolean`

Returns `true` if the expression is included in the user agent string.

### Parameters
| Name       | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| expression | string | The string to check in the user agent |

## Events

### `pause`

The `pause` event emits when the native platform puts the application into the background, typically when the user switches to a different application. This event emits when a Cordova/Capacitor app is put into the background but doesn't fire in a standard web browser.

#### Usage

```typescript
this.platform.pause.subscribe(async () => {
  alert('Pause event detected');
});
```

### `resize`

The `resize` event emits when the browser window has changed dimensions. This could be from a browser window being physically resized, or from a device changing orientation.

#### Usage

```typescript
this.platform.resize.subscribe(async () => {
  alert('Resize event detected');
});
```

### `resume`

The `resume` event fires when the native platform pulls the application out from the background. This event emits when a Cordova/Capacitor app comes out from the background but doesn't fire in a standard web browser.

#### Usage

```typescript
this.platform.resume.subscribe(async () => {
  alert('Resume event detected');
});
```