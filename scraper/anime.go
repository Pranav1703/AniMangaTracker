package scraper

import (
	"fmt"
	"github.com/gocolly/colly/v2"
)

type T_Anime struct {
	Place string
	Name string
	Url string
	ImgSrc string
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

		// fmt.Println(h.ChildTexts(".film-title"))
		// fmt.Println(h.ChildAttrs("a","href"))
		// fmt.Println(h.ChildTexts("span"))
		
		
		h.ForEach(".item",func(i int, h *colly.HTMLElement) {
			// fmt.Println(h.ChildAttr("a","href")) //url to anime from base url
			trendingAnime.Place = h.ChildText("span")
			trendingAnime.Name = h.ChildText(".film-title")
			trendingAnime.Url = baseUrl+h.ChildAttr("a","href")
			trendingAnime.ImgSrc = h.ChildAttr("img","src")
			trendingAnimeList = append(trendingAnimeList, *trendingAnime)
		})
		
	})

	c.Visit(baseUrl+"/home")
	// for _,data := range(trendingAnimeList){
	// 	fmt.Println(data)
	// }

	return trendingAnimeList
}