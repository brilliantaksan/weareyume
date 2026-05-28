import { getSiteData, galleryPublicUrl } from "@/lib/queries";
import { CrayonFilterHost } from "@/components/Scribbles";
import { CrayonCursor, ScribbleObserver } from "@/components/Effects";
import { Nav } from "@/components/Nav";
import { HeroA } from "@/components/Hero";
import {
  Manifesto,
  HowItWorks,
  Upcoming,
  Demos,
  Gallery,
  JoinCTA,
  Footer,
} from "@/components/Sections";
import { FAQ } from "@/components/FAQ";

// Always render fresh content so admin edits show up without a redeploy.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { content, demos, sessions, gallery, faqs } = await getSiteData();

  return (
    <>
      <CrayonFilterHost />
      <CrayonCursor />
      <ScribbleObserver />

      <Nav />

      <main>
        <HeroA content={content} />
        <Manifesto content={content} />
        <HowItWorks content={content} />
        <Upcoming content={content} sessions={sessions} />
        <Demos content={content} demos={demos} />
        <Gallery content={content} gallery={gallery} publicUrl={galleryPublicUrl} />
        <FAQ content={content} faqs={faqs} />
        <JoinCTA content={content} />
      </main>

      <Footer content={content} />
    </>
  );
}
