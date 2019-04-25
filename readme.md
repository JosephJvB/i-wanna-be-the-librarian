# I wanna be the librarian

Some sort of web file-storage.

Using as a chance to try on Typescript & file uploading

!!!make sure to move webpack + loaders into dev dependencies kids!

Before

![](http://snappyimages.nextwavesrl.netdna-cdn.com/img/914bdb9411d4e6966ff860d9c2fdff0b.png)

After

![](http://snappyimages.nextwavesrl.netdna-cdn.com/img/794b0ac7436b4ab9d373ed713e60c00c.png)

Is vue in typescript hard? I can think of one way to find out my man.

**Update**: yeah it's kinda tricky there are definitely a few gotchas.
- Thanks JohnPapa: https://johnpapa.net/vue-typescript/. PapaBless
- cant use `appendTsSuffixTo` with webpack: awesome-typescript-loader
- Vue shim was not behaving nicely at all
- few times already Ive had to use :any annotations to avoid editor errors from Vetur and TS. Which defeats the purpose..

