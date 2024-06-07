package scraper

import (
	"fmt"
	"github.com/gocolly/colly/v2"
)

type T_Anime struct{
	Place string
	Name string
	Url string
	ImgSrc string
}

type LU_Anime struct{
	Name string
	Url string
	ImgSrc string
	Duration string
}

func TrendingAnime() []T_Anime{
	
	trendingAnimeList := make([]T_Anime,0)

	
	baseUrl := "https://hianime.to"
	
	c := colly.NewCollector()

	c.OnRequest(func(r *colly.Request) {
		fmt.Printf("visiting %v\n", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Printf("scrapping %v\n", r.Request.URL)
	})

	c.OnError(func(r *colly.Response, err error) {
		fmt.Printf("somthing went wrong: %v\n", err)
	})

	c.OnHTML("#anime-trending",func(h *colly.HTMLElement) {
		
		trendingAnime := new(T_Anime)

		h.ForEach(".item",func(i int, h *colly.HTMLElement) {
			
			trendingAnime.Place = h.ChildText("span")
			trendingAnime.Name = h.ChildText(".film-title")
			trendingAnime.Url = baseUrl+h.ChildAttr("a","href")
			trendingAnime.ImgSrc = h.ChildAttr("img","src")
			trendingAnimeList = append(trendingAnimeList, *trendingAnime)

		})
		
	})

	c.Visit(baseUrl+"/home")

	return trendingAnimeList
}

func LatestReleaseAnime() []LU_Anime{
	
	baseUrl := "https://hianime.to"
	LatestAnimeList := make([]LU_Anime,0)

	c := colly.NewCollector()

	c.OnRequest(func(r *colly.Request) {
		fmt.Printf("visiting %v\n", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Printf("scrapping %v\n", r.Request.URL)
	})

	c.OnError(func(r *colly.Response, err error) {
		fmt.Printf("somthing went wrong: %v\n", err)
	})

	c.OnHTML(".film_list-wrap",func(h *colly.HTMLElement) {

		LatestAnime := new(LU_Anime)

		h.ForEach(".flw-item",func(i int, h *colly.HTMLElement) {

			LatestAnime.Name = h.ChildText(".dynamic-name")
			LatestAnime.Url = baseUrl +"/watch"+ h.ChildAttr(".dynamic-name","href")
			LatestAnime.ImgSrc = h.ChildAttr(".film-poster-img","data-src")
			LatestAnime.Duration = h.ChildText(".fdi-duration")

			LatestAnimeList = append(LatestAnimeList, *LatestAnime)
		})

	})

	c.Visit(baseUrl+"/recently-updated")
	return LatestAnimeList
}