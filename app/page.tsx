import Image from 'next/image';

import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from '@/components';
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';

/**
 * Home component for displaying a car catalog.
 *
 * @param {HomeProps} props - The component's properties.
 * @param {object} props.searchParams - Parameters for filtering the car catalog.
 * @param {string} [props.searchParams.manufacturer] - The manufacturer to filter by.
 * @param {number} [props.searchParams.year] - The year to filter by (default: 2023).
 * @param {string} [props.searchParams.fuel] - The fuel type to filter by.
 * @param {number} [props.searchParams.limit] - The maximum number of cars to display (default: 10).
 * @param {string} [props.searchParams.model] - The car model to filter by.
 */
export default async function Home({ searchParams }: HomeProps) {
  // Fetch car data based on search parameters
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2023,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  // Check if the car data is empty
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>No results found</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
