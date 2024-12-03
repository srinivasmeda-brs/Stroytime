import { useEffect, useState } from "react";
import AuthorsList from "../components/authors/AuthorsList";
import { useGetCategoriesQuery } from "../store/category/categoryApiSlice";
import { useGetLanguagesQuery } from "../store/language/languageApiSlice";
import { useGetAuthorsStoriesQuery } from "../store/spotify/spotifyApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthorsPage = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [languageNames, setLanguageNames] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // API Query for categories and languages
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: languagesData } = useGetLanguagesQuery();
  const { data: authorsData, isLoading: authorsIsLoading } =
    useGetAuthorsStoriesQuery({
      queryParams: {
        q: `"${categoryNames}" languages: ${languageNames}`,
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: "50",
      },
    });

  // Log the authors data to check it's being fetched
  useEffect(() => {
    console.log("Authors Data:", authorsData);
    if (authorsData) {
      const nonExplicitAuthorsStories = authorsData.shows.items.filter(
        (story) => !story.explicit
      );
      setAuthorsList(nonExplicitAuthorsStories);
    }
  }, [authorsData]);

  // Format categories and languages for the query
  useEffect(() => {
    if (categoriesData) {
      const formattedCategoryNames = categoriesData
        .map((category) => `"${category.category}"`)
        .join(", ");
      setCategoryNames(formattedCategoryNames);
    }
    if (languagesData) {
      const formattedLanguageNames = languagesData
        .map((language) => `"${language.name}"`)
        .join(", ");
      setLanguageNames(formattedLanguageNames);
    }
  }, [languagesData, categoriesData]);

  // Filtering authors based on the search query
  const filteredAuthorsList = authorsList.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-5 px-5">
      <div className="mb-5">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg text-blue-900"
          placeholder="Search authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {authorsIsLoading ? (
        <LoadingSpinner />
      ) : filteredAuthorsList.length > 0 ? (
        <AuthorsList authors={filteredAuthorsList} />
      ) : (
        <p className="text-center my-16">
          No Stories to load, please try later
        </p>
      )}
    </div>
  );
};

export default AuthorsPage;
