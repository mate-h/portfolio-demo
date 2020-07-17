/**
 * Based on documentation from https://jobs.github.com/api
 */
declare module "GitHubJobs" {
  type ListPositionsBaseParams = Partial<{
    /** A search term, such as "ruby" or "java". This parameter is aliased to search. */
    description: string;
    /** A search term, such as "ruby" or "java". This parameter is aliased to description. */
    search: string;
    /** If you want to limit results to full time positions set this parameter to 'true'. */
    full_time: boolean;
  }>;

  type StringLocationParams = {
    /** A city name, zip code, or other location search term. */
    location: string;
  };

  type LatLongLocationParams = {
    /** A specific latitude. If used, you must also send long and must not send location. */
    lat: string;
    /** A specific longitude. If used, you must also send lat and must not send location. */
    long: string;
  };

  export type ListPositionsParams = ListPositionsBaseParams &
    ((LatLongLocationParams | StringLocationParams) | {});

  export interface API {
    /**
     * Search for jobs by term, location, full time vs part time, or any combination of the three. All parameters are optional.
     *
     * @param params The GET parameters for this request
     * @returns JSON representation of any search result or job listing
     */
    listPositions: (params?: ListPositionsParams) => ListPositionsResponse;
  }

  export type ListPositionsResponse = JobPosting[];
  export type ListPositionsKeyedResponse = { [id: string]: JobPosting };

  export type JobPosting = {
    id: string;
    type: string;
    url: string;
    created_at: string;
    company: string;
    company_url?: string;
    location: string;
    title: string;
    description: string;
    how_to_apply: string;
    company_logo?: string;
  };
}
