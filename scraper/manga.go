package scraper

import (
	"fmt"
	"github.com/gocolly/colly/v2"
)

type LU_Manga struct{  //LU - latest update
    Url string
    Title string
    Chapters_released []string
	ImgSrc string
}

type T_Manga struct{

}

func LastestUpdateManga()[]LU_Manga {

	c := colly.NewCollector()
	manga_data := make([]LU_Manga,0)

	url := "https://ww1.mangafreak.me"

	c.OnRequest(func(r *colly.Request) {
		fmt.Printf("visiting %v\n", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Printf("scrapping %v\n", r.Request.URL)
	})

	c.OnError(func(r *colly.Response, err error) {
		fmt.Printf("somthing went wrong: %v\n", err)
	})

	c.OnHTML(".latest_item", func(h *colly.HTMLElement) {

        manga := new(LU_Manga)

		link := h.ChildAttr("a", "href")
        manga.Url = url + link

		manga.Title = h.ChildText(".name")

		manga.ImgSrc = h.ChildAttr("img","src")

	    h.ForEach(".chapter_box",func(i int, h *colly.HTMLElement) {
            manga.Chapters_released = h.ChildTexts("a")
        })

		// fmt.Printf("\n")
		// fmt.Println("title: ",manga.title)
        // fmt.Println("URL: ",manga.url)
        // fmt.Println("Chapters released: ",manga.chapters_released)
		// fmt.Printf("\n")
		manga_data = append(manga_data, *manga)

	})

	c.Visit(url)
	return manga_data
}


