import { Input, Component } from '@angular/core';

@Component(
{
    selector: 'tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.css']
})
export class TabComponent
{
    @Input() private Text:string;
    private ngOnInit() : void
    {
        
    }
}
