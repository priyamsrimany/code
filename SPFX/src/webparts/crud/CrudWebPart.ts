import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CrudWebPartStrings';
import Crud from './components/Crud';
import { ICrudProps } from './components/ICrudProps';

export interface ICrudWebPartProps {
  description: string;
  listName: string;
}

export default class CrudWebPart extends BaseClientSideWebPart<ICrudWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICrudProps> = React.createElement(
      Crud,
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        listName: this.properties.listName,
        siteUrl: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
