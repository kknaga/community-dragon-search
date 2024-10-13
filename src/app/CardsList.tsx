/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ReactElement, useState, useMemo, useEffect } from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import PropertyFilter from "@cloudscape-design/components/property-filter";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences, { CollectionPreferencesProps } from "@cloudscape-design/components/collection-preferences";
import { useCollection } from '@cloudscape-design/collection-hooks';
import { cardDefinitions, paginationLabels, collectionPreferencesProps } from './card-config';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';

function EmptyState({ title, subtitle, action }: { title: string, action?: ReactElement, subtitle?: string }) {
  return (
    <Box textAlign="center" color="inherit">
      <Box variant="strong" textAlign="center" color="inherit">
        {title}
      </Box>
      <Box variant="p" padding={{ bottom: 's' }} color="inherit">
        {subtitle}
      </Box>
      {action}
    </Box>
  );
}

export type Item = {
  path: string,
  name: string | undefined,
  ext: string | undefined,
  isImage: string,
  isJson: string
}

export default function CardsList() {
  useEffect(() => {
    (async () => {
      const response = await fetch('https://raw.communitydragon.org/pbe/cdragon/files.exported.txt');
      const text = await response.text();
      setAllItems(text.split('\n').map(path => {
        const dotIndex = path.lastIndexOf('.');
        const ext = (dotIndex + 1) ? path.substring(dotIndex + 1, path.length) : undefined

        return {
          path,
          name: path.split('/').pop(),
          ext,
          isImage: ext && ['png', 'webp', 'svg', 'jpg', 'jpeg', 'bmp'].includes(ext) ? 'yes' : 'no',
          isJson: path.endsWith('.json') ? 'yes' : 'no'
        }
      }))
    })();
  }, [])
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>({
    pageSize: 20,
  });
  const { items, actions, filteredItemsCount, collectionProps, propertyFilterProps, paginationProps } = useCollection(
    allItems,
    {
      propertyFiltering: {
        empty: <EmptyState title="No matches" />,
        noMatch: (
          <EmptyState
            title="No matches"
            action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>}
          />
        ),
        filteringProperties: [
          {
            key: "path",
            operators: ["=", "!=", ":", "!:", "^", "!^"],
            propertyLabel: "Path",
            groupValuesLabel: "Path"
          },
          {
            key: "name",
            operators: ["=", "!=", ":", "!:", "^", "!^"],
            propertyLabel: "File name",
            groupValuesLabel: "File name"
          },
          {
            key: "ext",
            operators: ["=", "!=", ":", "!:"],
            propertyLabel: "File extension",
            groupValuesLabel: "File extensions"
          },
          {
            key: "isImage",
            operators: ["="],
            propertyLabel: "Is image",
            groupValuesLabel: "Options"
          },
          {
            key: "isJson",
            operators: ["="],
            propertyLabel: "Is JSON",
            groupValuesLabel: "Options"
          }
        ]
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: {},
      selection: {},
    }
  );

  const extensions = useMemo(() => {
    return [...new Set(allItems.flatMap(item => item.ext && item.ext.length < 6 ? item.ext : []))].map(ext => ({ propertyKey: 'ext', value: ext }))
  }, [allItems]);

  const otherFilterOptions = [
    { propertyKey: 'isImage', value: 'yes' },
    { propertyKey: 'isImage', value: 'no' },
    { propertyKey: 'isJson', value: 'yes' },
    { propertyKey: 'isJson', value: 'no' },
  ]

  return (
    <I18nProvider locale="en" messages={[messages]}>
      <Cards
        {...collectionProps}
        header={<Header
          variant="h3"
          counter={`(${filteredItemsCount})`}
        >
          Search CommunityDragon files
        </Header>}
        stickyHeader
        cardDefinition={cardDefinitions}
        cardsPerRow={[{
          cards: 1
        }, {
          minWidth: 768,
          cards: 2
        }, {
          minWidth: 992,
          cards: 3
        }, {
          minWidth: 1200,
          cards: 4
        }, {
          minWidth: 1400,
          cards: 5
        }, {
          minWidth: 1920,
          cards: 6
        }]}
        items={items}
        loadingText="Loading results"
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            countText={`${filteredItemsCount} results`}
            expandToViewport
            filteringAriaLabel="Find results"
            filteringOptions={extensions.concat(otherFilterOptions)}
            filteringPlaceholder="Find results"
          />
        }
        pagination={<Pagination {...paginationProps} ariaLabels={paginationLabels} />}
        preferences={
          <CollectionPreferences
            {...collectionPreferencesProps}
            preferences={preferences}
            onConfirm={({ detail }) => setPreferences(detail)}
          />
        }
      />
    </I18nProvider>
  );
}