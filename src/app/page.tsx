import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BentoGrid,BentoGridItem } from "@/components/ui/BentoGrid";
import {
  IconArtboard,
  IconArtboardFilled,
  IconBoxModel2,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";


const Skeleton = () => (
  <Image className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl " src={"/figma2.jpg"} width={1000} height={1000} alt=""/>
);

const items = [
  {
    title: "Professional Figma designs",
    description: "High quality figma designs.",
    header: <Image className="flex flex-1 w-[100%] h-[50%] min-h-[6rem] rounded-xl " src={"/figma4.png"} width={1000} height={1000} alt=""/>,
    className: "md:col-span-2",
    icon: <IconArtboard className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Icon Packs",
    description: "Find variety of Icon packs .",
    header: <Image className="flex flex-1 w-[100%] h-[50%] min-h-[6rem] rounded-xl " src={"/iconpacks.png"} width={1000} height={1000} alt=""/>,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "3D models",
    description: "Models for your next projects.",
    header: <Image className="flex flex-1 w-[100%] h-[50%] sm:w-full sm:h-full min-h-[6rem] rounded-xl " src={"/3dmodels.png"} width={1000} height={1000} alt=""/>,
    className: "md:col-span-1",
    icon: <IconBoxModel2 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Website Templates",
    description:
      "Templates for your next web endevour.",
    header: <Image className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl " src={"/websiteTemplates.jpg"} width={1000} height={1000} alt=""/>,
    className: "md:col-span-1",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];

const perks  = [
  {
    name:'Instant Delivery',
    Icon:ArrowDownToLine,
    descrription:'Get your assets delivered to your email in seconds to download them right away.'

  },
  {
    name:'Guarranteed Quality',
    Icon:CheckCircle,
    descrription:'Get only the verified and quality assets to download. Not happy ? We offer a 30-day return policy with full refund.'

  },
  {
    name:'Planet Friendly',
    Icon:Leaf,
    descrription:'Donate to ecosystem as our 3% of our sales are pledged for enviroment and recycling.   '

  },
]


export default function Home() {
  
  
  return (
    <>
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">All in One Marketplace for your{' '}
          <span className="text-red-500"> Digital Assets.</span>
          
        </h1>
        <p className="mt-6 text-lg max-w-prose  ">Welcome to the AssetStore. A world of verified and high-quality digital assets.</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href='/products' className={buttonVariants()}>Browse Trending</Link>
          <Button variant='outline'>Our quality promise &rarr;</Button>
        </div>
      </div>

      {/* {TODO : ADD products} */}
    </MaxWidthWrapper>
    <section className="mb-10">
    <MaxWidthWrapper>
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      <div className="text-left p-6">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
      Things you can buy or sell on AssetStore
      </h1>
       
      </div>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
    </MaxWidthWrapper>

    </section>

    <section className="border-t border-gray-200 bg-gray-50">
      <MaxWidthWrapper className="py-20">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 ">
            {perks.map((perk)=>(
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100 text-red-900">
                    {<perk.Icon/>}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">  
                  <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.descrription}
                  </p>
                </div>
              </div>
              
            ))}
        </div>
      </MaxWidthWrapper>
    </section>
    </>
  );
}
