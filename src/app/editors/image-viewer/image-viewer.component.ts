import Engineer from "./../../engineer";

import { Input, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component(
{
    selector: 'image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent
{
    @Input() private ImagePath:string;
    public constructor(private Sanitizer:DomSanitizer) {}
    public ngOnInit() : void {}
    private Sanitize(Url:string)
    {
        return this.Sanitizer.bypassSecurityTrustResourceUrl(Url);
    }
}
