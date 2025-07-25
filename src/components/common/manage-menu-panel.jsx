"use client"

import { useState, useEffect } from "react"

export default function ManageMenuPanel({ restaurant, onClose, dishAnalyticsData, wineAnalyticsData, recentUpdates = [] }) {
  const [activeTab, setActiveTab] = useState("food")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(true)

  console.log(dishAnalyticsData, "dishAnalyticsData");
  console.log(wineAnalyticsData, "wineAnalyticsData");

  const foodItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 14.99,
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      popular: true,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      category: "Pasta",
      price: 16.99,
      description: "Spaghetti with egg, cheese, pancetta, and black pepper",
      popular: true,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Caprese Salad",
      category: "Appetizers",
      price: 10.99,
      description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
      popular: false,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "Tiramisu",
      category: "Desserts",
      price: 8.99,
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      popular: true,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const wineItems = [
    {
      id: 1,
      name: "Chianti Classico",
      category: "Red Wine",
      price: 38.0,
      description: "Dry, medium-bodied red wine from Tuscany",
      popular: true,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Pinot Grigio",
      category: "White Wine",
      price: 32.0,
      description: "Light, crisp white wine with notes of citrus and green apple",
      popular: true,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Prosecco",
      category: "Sparkling Wine",
      price: 36.0,
      description: "Refreshing sparkling wine with notes of apple, pear, and honeysuckle",
      popular: false,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const filteredItems =
    activeTab === "food"
      ? foodItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : wineItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )

  // Food analytics data
  const foodAnalytics = {
    totalDishes: dishAnalyticsData?.totalDishes,
    newItems: dishAnalyticsData?.newDishesInThirtyDays,
    removedItems: dishAnalyticsData?.removedDishesInThirtyDays,
    lastUpdated: dishAnalyticsData?.lastUpdatedDish,
    categoryDistribution: [
      { name: "Main Course", percentage: dishAnalyticsData?.mainCourseDishPercentage },
      { name: "Appetizers", percentage: dishAnalyticsData?.appetizerDishPercentage },
      { name: "Desserts", percentage: dishAnalyticsData?.dessertDishPercentage },
      { name: "Specials", percentage: dishAnalyticsData?.specialDishPercentage },
    ],
    dietaryOptions: [
      { name: "Vegetarian", count: dishAnalyticsData?.vegetarianDishes },
      { name: "Vegan", count: dishAnalyticsData?.veganDishes },
      { name: "Gluten-Free", count: dishAnalyticsData?.gluttenFreeDishes },
      { name: "Nut-Free", count: dishAnalyticsData?.nuttFreeDishes },
    ],
    commonAllergen: `Gluten (${dishAnalyticsData?.glutenCommonAllergenDishes} dishes)`,
    recentUpdates: (dishAnalyticsData?.recentDishUpdates || []).map(update => {
      let type = '';
      if (update.action === 'dish_created') type = 'added';
      else if (update.action === 'dish_deleted') type = 'removed';
      else if (update.action === 'dish_updated') type = 'updated';
      else if (update.action === 'dish_restored') type = 'restored';
      else type = 'other';
      return {
        type,
        item: update.details?.description || '',
        user: update.user_uuid ? `${update.user_uuid.first_name} ${update.user_uuid.last_name}` : '',
        time: update.timestamp ? new Date(update.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
      };
    })
  }

  // Wine analytics data
  const wineAnalytics = {
    totalWines: wineAnalyticsData.totalWines,
    newWines: wineAnalyticsData.newWinesInThirtyDays,
    removedWines: wineAnalyticsData.removedWinesInThirtyDays,
    lastUpdated: wineAnalyticsData.lastUpdatedWine,
    categoryDistribution: [
      { name: "Red Wine", percentage: wineAnalyticsData.redWinePercentage },
      { name: "White Wine", percentage: wineAnalyticsData.whiteWinePercentage },
      { name: "Sparkling", percentage: wineAnalyticsData.sparklingWinePercentage },
      { name: "Rosé", percentage: wineAnalyticsData.roseWinePercentage },
    ],
    regionDistribution: [
      { name: "France", percentage: wineAnalyticsData.frnaceRegionPercentage },
      { name: "Italy", percentage: wineAnalyticsData.italyRegionPercentage },
      { name: "USA", percentage: wineAnalyticsData.usaRegionPercentage },
      { name: "Others", percentage: wineAnalyticsData.otherRegionPercentage },
    ],
    grapeVarietals: [
      { name: "Cabernet Sauvignon", count: wineAnalyticsData.cabernetSauvignon },
      { name: "Chardonnay", count: wineAnalyticsData.chardonnay },
      { name: "Pinot Noir", count: wineAnalyticsData.pinotNoir },
      { name: "Sauvignon Blanc", count: wineAnalyticsData.sauvignonBlanc },
    ],
    wineStyles: [
      { name: "Full-bodied Red", percentage: wineAnalyticsData.fullBodiedRedPercentage },
      { name: "Crisp White", percentage: wineAnalyticsData.crispWhite },
      { name: "Sweet Dessert", percentage: wineAnalyticsData.sweetDessert },
      { name: "Sparkling", percentage: wineAnalyticsData.sparkling },
    ],
    characteristics: [
      { name: "Organic", count: wineAnalyticsData.organicWines },
      { name: "Biodynamic", count: wineAnalyticsData.biodynamicWines },
      { name: "Vegan", count: wineAnalyticsData.veganWines },
    ],
    recentUpdates: (wineAnalyticsData?.recentWineUpdates || [])?.map(update => {
      let type = '';
      if (update.action === 'wine_created') type = 'added';
      else if (update.action === 'wine_deleted') type = 'removed';
      else if (update.action === 'wine_updated') type = 'updated';
      else if (update.action === 'wine_restored') type = 'restored';
      else type = 'other';
      return {
        type,
        item: update.details?.description || '',
        user: update.user_uuid ? `${update.user_uuid.first_name} ${update.user_uuid.last_name}` : '',
        time: update.timestamp ? new Date(update.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
      };
    }),
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-[50%] bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Manage Menu</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>


      {/* Modal Content */}
      <div className="p-4">
        {/* Tabs */}
        <div className="w-full mb-4">
          <div className="grid w-full grid-cols-2 rounded-md overflow-hidden">
            <button
              onClick={() => setActiveTab("food")}
              className={`flex items-center justify-center gap-2 py-2 px-4 ${activeTab === "food" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 border border-red-600"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Food Menu
            </button>
            <button
              onClick={() => setActiveTab("wine")}
              className={`flex items-center justify-center gap-2 py-2 px-4 ${activeTab === "wine" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 border border-red-600"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Wine List
            </button>
          </div>
        </div>

        {/* Food Analytics Content */}
        {activeTab === "food" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-gray-600">Total Dishes</div>
                <div className="text-2xl font-bold">{foodAnalytics.totalDishes}</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-gray-600">New Items (30 Days)</div>
                <div className="text-2xl font-bold">{foodAnalytics.newItems}</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-gray-600">Removed (30 Days)</div>
                <div className="text-2xl font-bold">{foodAnalytics.removedItems}</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-gray-600">Last Updated</div>
                <div className="text-base font-medium truncate">{foodAnalytics.lastUpdated}</div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-amber-100">
              <h3 className="text-sm font-medium mb-3">Menu Category Distribution</h3>
              <div className="space-y-3">
                {foodAnalytics.categoryDistribution.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <div className="flex-1 ">
                        <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div>{category.name}</div>
                        <div className="text-gray-500">({category.percentage}%)</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Dietary & Allergen Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                {foodAnalytics.dietaryOptions.map((option) => (
                  <div key={option.name} className="bg-background p-4 rounded-lg border border-amber-100">
                    <div className="text-sm text-gray-600">{option.name}</div>
                    <div className="text-lg font-medium">{option.count} dishes</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-amber-100">
              <h3 className="text-sm font-medium mb-1">Most Common Allergen</h3>
              <div className="text-lg font-medium">{foodAnalytics.commonAllergen}</div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Recent Menu Updates</h3>
                <button className="text-red-600 text-sm">View All</button>
              </div>
              <div className="space-y-3 text-left">
                {foodAnalytics.recentUpdates.map((update, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden bg-background">
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {update.type === "added" && (
                            <div className="bg-red-100 p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </div>
                          )}
                          {update.type === "price" && (
                            <div className="bg-green-100 p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          )}
                          {update.type === "removed" && (
                            <div className="bg-red-100 p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          )}
                          {update.type === "updated" && (
                            <div className="bg-blue-100 p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </div>
                          )}
                          {update.type === "restored" && (
                            <div className="bg-green-100 p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-left">
                            {update.type === "added" && "New Item Added"}
                            {update.type === "price" && "Price Update"}
                            {update.type === "removed" && "Item Removed"}
                            {update.type === "updated" && "Item Updated"}
                            {update.type === "restored" && "Item Restored"}
                          </div>
                          <div className="text-sm text-gray-600">{update.item}</div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700">
                                {update.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className="text-xs text-gray-500">{update.user}</span>
                            </div>
                            <span className="text-xs text-gray-500">{update.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Wine Analytics Content */}
        {activeTab === "wine" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-gray-600">Total Wines</div>
                <div className="text-2xl font-bold">{wineAnalytics.totalWines}</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-gray-600">New Wines (30 Days)</div>
                <div className="text-2xl font-bold">{wineAnalytics.newWines}</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-gray-600">Removed (30 Days)</div>
                <div className="text-2xl font-bold">{wineAnalytics.removedWines}</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-gray-600">Last Updated</div>
                <div className="text-base font-medium truncate">{wineAnalytics.lastUpdated}</div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-amber-100">
              <h3 className="text-sm font-medium mb-3">Wine Category Distribution</h3>
              <div className="flex justify-center mb-4">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rounded-full border-8 border-red-200"></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-red-600"
                    style={{ transform: "rotate(0deg)" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-amber-400"
                    style={{ transform: "rotate(162deg)" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-yellow-400"
                    style={{ transform: "rotate(270deg)" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-pink-400"
                    style={{ transform: "rotate(324deg)" }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {wineAnalytics.categoryDistribution.map((category) => (
                  <div key={category.name} className="flex items-center gap-2 bg-background p-2 rounded-lg border border-amber-100">
                    <div
                      className={`h-3 w-3 rounded-full ${category.name === "Red Wine"
                        ? "bg-red-600"
                        : category.name === "White Wine"
                          ? "bg-amber-400"
                          : category.name === "Sparkling"
                            ? "bg-yellow-400"
                            : "bg-pink-400"
                        }`}
                    ></div>
                    <span className="text-sm">{category.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">{category.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-amber-100">
              <h3 className="text-sm font-medium mb-3">Regional Distribution</h3>
              <div className="space-y-3">
                {wineAnalytics.regionDistribution.map((region) => (
                  <div key={region.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <div className="flex-1">
                        <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${region.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div>{region.name}</div>
                        <div className="text-gray-500">({region.percentage}%)</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-amber-100">
              <h3 className="text-sm font-medium mb-3">Most Common Grape Varietals</h3>
              <div className="grid grid-cols-2 gap-4">
                {wineAnalytics.grapeVarietals.map((grape) => (
                  <div key={grape.name} className="bg-background p-4 rounded-lg border border-amber-100">
                    <div className="text-sm text-gray-600">{grape.name}</div>
                    <div className="text-lg font-medium">{grape.count} wines</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-amber-100">
              <h3 className="text-sm font-medium mb-3">Popular Wine Styles</h3>
              <div className="space-y-3">
                {wineAnalytics.wineStyles.map((style) => (
                  <div key={style.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{style.name}</span>
                      <span>{style.percentage}%</span>
                    </div>
                    <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full"
                        style={{ width: `${style.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Wine Characteristics</h3>
              <div className="grid grid-cols-3 gap-4">
                {wineAnalytics.characteristics.map((char) => (
                  <div key={char.name} className="bg-background p-4 rounded-lg border border-amber-100">
                    <div className="text-sm text-gray-600">{char.name}</div>
                    <div className="text-lg font-medium">{char.count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Recent Wine Updates</h3>
                <button className="text-red-600 text-sm">View All</button>
              </div>
              <div className="space-y-3">
                {wineAnalytics.recentUpdates.map((update, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden bg-background">
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {update.type === "added" && (
                            <div className="bg-red-100 p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </div>
                          )}
                          {update.type === "price" && (
                            <div className="bg-green-100 p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          )}
                          {update.type === "removed" && (
                            <div className="bg-red-100 p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1  text-left" >
                          <div className="font-medium">
                            {update.type === "added" && "New Wine Added"}
                            {update.type === "price" && "Price Update"}
                            {update.type === "removed" && "Wine Removed"}
                          </div>
                          <div className="text-sm text-gray-600">{update.item}</div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700">
                                {update.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className="text-xs text-gray-500">{update.user}</span>
                            </div>
                            <span className="text-xs text-gray-500">{update.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
