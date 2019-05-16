import { Component } from "@angular/core";
import appStyle from "./app.styles.scss";
import appTemplate from "./app.template.html";

@Component({
    selector: "app",
    styles: [appStyle],
    template: appTemplate
})
// @Component({
//     selector: "app",
//     styles: [
//         `
//             div {
//                 border: solid red;
//             }
//         `
//     ],
//     template: appTemplate
// })
export class AppComponent {}
