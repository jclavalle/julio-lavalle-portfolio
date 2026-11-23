# Caja Clara card visual

`card.html` is the source for `public/caja-clara/card-illustration.jpg`, the homepage card.
It is an illustrative, dark-mode reconstruction of the prototype with synthetic data.

Render (1672x941, same size as the other card visuals):

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1672,941 \
  --screenshot=/tmp/card.png "file://$PWD/assets/caja-clara-card/card.html"
sips -s format jpeg -s formatOptions 88 /tmp/card.png --out public/caja-clara/card-illustration.jpg
```
