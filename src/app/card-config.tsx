/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as React from 'react';
import { Item } from './CardsList';
import { Link } from '@cloudscape-design/components';

export function getMatchesCountText(count: number | undefined) {
  return count === 1 ? `1 match` : `${count} matches`;
}

export function getCDPath(source: string) {
  return `https://raw.communitydragon.org/latest/${source}`
}
export const cardDefinitions = {
  header: (item: Item) => (
    <Link href={getCDPath(item.path)} fontSize="heading-s" external>
      {item.name}
    </Link>
  ),
  sections: [
    {
      id: "main",
      content: (item: Item) => (
        <div className='item'>
          {item.isImage === 'yes' && <img src={getCDPath(item.path)} height="150" alt={item.name} className="cardImg" />}
          <div>
            <div><small>{item.path}</small></div>
          </div>
        </div>
      )
    }
  ]
};

export const paginationLabels = {
  nextPageLabel: 'Next page',
  pageLabel: (pageNumber: number) => `Go to page ${pageNumber}`,
  previousPageLabel: 'Previous page',
};

const pageSizePreference = {
  title: 'Select page size',
  options: [
    { value: 20, label: '20 results' },
    { value: 50, label: '50 results' },
    { value: 100, label: '100 results' },
    { value: 200, label: '200 results' },
    { value: 100000, label: 'All results (might cause performance issues)' },
  ],
};

export const collectionPreferencesProps = {
  pageSizePreference,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  title: 'Preferences',
};