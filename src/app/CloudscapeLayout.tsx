"use client";
import React, { useEffect, useState } from "react";
import {
  AppLayout,
  SideNavigation,
} from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import Skinslist from "./CardsList";

const LOCALE = "en";

export default function CloudscapeLayout() {
  const [navState, setNavState] = useState(true);
  useEffect(() => {
    applyMode(Mode.Dark);
  }, []);

  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <AppLayout
        toolsHide
        maxContentWidth={2600}
        navigationOpen={navState}
        onNavigationChange={() => setNavState(s => !s)}
        navigation={
          <SideNavigation
            header={{
              href: 'https://github.com/kknaga/community-dragon-search',
              text: 'CDragon Search',
            }}
            items={[
              {
                type: 'link',
                text: `Raw`,
                external: true,
                href: `https://raw.communitydragon.org/`
              },
              {
                type: 'link',
                text: `CDN`,
                external: true,
                href: `https://cdn.communitydragon.org/`
              },
              {
                type: 'link',
                text: `Docs`,
                external: true,
                href: `https://github.com/communitydragon/docs/blob/master/assets.md`
              },
              {
                type: 'link',
                text: `Bin viewer`,
                external: true,
                href: `https://raw.communitydragon.org/binviewer/`
              },
              {
                type: 'link',
                text: `Community Dragon Github`,
                external: true,
                href: `https://raw.communitydragon.org/`
              },
              {
                type: 'divider',
              },
              {
                type: 'link',
                text: 'CDragon Search on Github',
                href: 'https://github.com/kknaga/community-dragon-search',
                external: true,
              }
            ]}
            
          />
        }
        content={
          <Skinslist />
        }
      />
    </I18nProvider>
  );
}
