import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';
import { MessageService } from '../../../shared/service/data/message.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error {color: red;}']
})
export class ConfigComponent {
    error: any;
    headers: string[];
    config: Config;

    constructor(private configService: ConfigService) {}

    clear() {
        this.config = undefined;
        this.error = undefined;
        this.headers = undefined;
    }
    
    showConfigResponse() {
        this.configService.getConfigResponse()
            // resp is of type HttpResponse<Config>
            .subscribe(resp => {
                //display its headers
                const keys = resp.headers.keys();
                this.headers = keys.map(key =>
                    `${key}: ${resp.headers.get(key)}`);

                // access the body directly, which is typed as 'Config'.
                this.config = { ... resp.body };
            });
    }

    showConfig() {
        this.configService.getConfig()
          .subscribe((data: Config) => this.config = { ... data}), //success path
          error => this.error = error // error path
    };
}

