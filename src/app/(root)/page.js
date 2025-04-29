import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import {STARTUP_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";


export default async function Home({searchParams}) {
  const query = (await searchParams).query ;
  const params = { search: query || null};


  const session = await getServerSession(authOptions);

  console.log(session?.id);

  const {data: posts} = await sanityFetch({ query: STARTUP_QUERY, params });
  

  return (

    <div className="bg-white">
       <section className="pink_container mt-12 bg-[#EE2B69]">
          <h1 className="heading">
           Pitch Your Startup<br/> Connect With Entrepreneurs
          </h1>

          <p className="sub-heading !max-w-3xl">
              Submit Ideas, Vote on Piches, and Get Noticed in virtual Competitions
          </p>

          <SearchForm query={query}/>
       </section> 


        {/* Startup Lists */}
       <section className="section_container">
          <p className="text-2xl font-semibold">
              {query ? `Search results for "${query}"`: "All Startups"}
          </p>

          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts.map((post, index) => (
                  <StartupCard key={post?._id} post={post} />
              ))

            ) : (
              <p className="no-result">
                  No startups found
              </p>

            )}

          </ul>
       </section>
       < SanityLive />
    </div>
  );
}
