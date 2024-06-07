package scraper

import (
	"fmt"
	"github.com/gocolly/colly/v2"
)

type LU_Manga struct { //LU - latest update
	Url               string
	Title             string
	Chapters_released []string
	ImgSrc            string
}

type T_Manga struct {
	Url string
	Position string
	Title string
	ImgSrc string
}

func LastestUpdatedManga() []LU_Manga {

	c := colly.NewCollector()
	manga_data := make([]LU_Manga, 0)

	url := "https://ww1.mangafreak.me"

	c.OnRequest(func(r *colly.Request) {
		fmt.Printf("visiting %v\n", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Printf("scrapping %v\n", r.Request.URL)
	})

	c.OnScraped(func(r *colly.Response) {
		fmt.Printf("scrapped %v\n",r.Request.URL)
	})

	c.OnError(func(r *colly.Response, err error) {
		fmt.Printf("somthing went wrong: %v\n", err)
	})

	c.OnHTML(".latest_item", func(h *colly.HTMLElement) {

		manga := new(LU_Manga)

		link := h.ChildAttr("a", "href")
		manga.Url = url + link

		manga.Title = h.ChildText(".name")

		manga.ImgSrc = h.ChildAttr("img", "src")

		h.ForEach(".chapter_box", func(i int, h *colly.HTMLElement) {
			manga.Chapters_released = h.ChildTexts("a")
		})

		manga_data = append(manga_data, *manga)

	})

	c.Visit(url)
	return manga_data
}

func TrendingManga() []T_Manga{
	
	c := colly.NewCollector()
	trendingMangaData := make([]T_Manga,0)

	url := "https://mangareader.to/home"

	c.OnRequest(func(r *colly.Request) {
		fmt.Printf("visiting %v\n", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Printf("scrapping %v\n", r.Request.URL)
	})

	c.OnScraped(func(r *colly.Response) {
		fmt.Printf("scrapped %v\n",r.Request.URL)
	})

	c.OnError(func(r *colly.Response, err error) {
		fmt.Printf("somthing went wrong: %v\n", err)
	})

	c.OnHTML("#manga-trending",func(h *colly.HTMLElement) {
		
		TManga := new(T_Manga)
		
		h.ForEach(".swiper-slide",func(i int, h *colly.HTMLElement) {

			TManga.Title = h.ChildText(".anime-name")
			TManga.ImgSrc = h.ChildAttr("img","src")
			h.ForEach(".mpd-buttons",func(i int, h *colly.HTMLElement) {
				links := h.ChildAttrs("a","href")
				TManga.Url = "https://mangareader.to" + links[0]
			})
			h.ForEach(".number",func(i int, h *colly.HTMLElement) {
				TManga.Position = h.ChildText("span")
			})
			trendingMangaData = append(trendingMangaData, *TManga)
		})

	})

	c.Visit(url)
	return trendingMangaData
}
