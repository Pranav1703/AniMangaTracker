package main

import (
	"fmt"
	"ani-manga_scraper/scraper"

	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Ani-Manga_Scarper",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}

	//scraper code
		
	fmt.Println("--------------------------------------------------------------------------------------------")
	var choice int;
	fmt.Println("Type '1' for recent manga chapters update and '2' for trending anime list.")
	fmt.Scanf("%d",&choice);
	if(choice == 1){
		manga_data := scraper.LastestUpdateManga()

		for _,data := range(manga_data){
			fmt.Printf("\n")
			fmt.Println("title: ",data.Title)
			fmt.Println("URL: ",data.Url)
			fmt.Println("Chapters released: ",data.Chapters_released)
			fmt.Println("imgSrc: ",data.ImgSrc)
			fmt.Printf("\n")
		}
	}else if(choice == 2){
		
		trendingAnimelist := scraper.TrendingAnime()

		for _,aniData := range(trendingAnimelist){
			fmt.Println()
			fmt.Println("No: ",aniData.Place)
			fmt.Println("Name: ",aniData.Name)
			fmt.Println("Url: ",aniData.Url)
			fmt.Println()
	
		}
	}
	fmt.Println("--------------------------------------------------------------------------------------------")
}
