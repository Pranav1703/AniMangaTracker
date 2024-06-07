package main

import (
	"context"
	"fmt"
	"os/exec"
    "runtime"
	"ani-manga_scraper/scraper"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) OpenUrl(url string) error {
	
	var cmd *exec.Cmd

    switch runtime.GOOS {
    case "windows":
        cmd = exec.Command("cmd", "/c", "start", url)
    case "darwin":
        cmd = exec.Command("open", url)
    default:
        cmd = exec.Command("xdg-open", url)
    }
	return cmd.Run()
}

func (a *App) GetUpdatedManga() []scraper.LU_Manga{
	data := scraper.LastestUpdatedManga()
	return data
} 

func (a *App) GetTrendingManga() []scraper.T_Manga{
	data := scraper.TrendingManga()
	return data
}

func (a *App) GetLatestReleaseAnime()[]scraper.LU_Anime{
	data := scraper.LatestReleaseAnime()
	return data
}

func (a *App) GetTrendingAnime() []scraper.T_Anime{
	data := scraper.TrendingAnime()
	return data
}
