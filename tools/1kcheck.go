package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	ret := 0
	path := "./"
	if len(os.Args) > 1 {
		path = os.Args[1]
	}
	files, _ := ioutil.ReadDir(path)
	for _, f := range files {
		if f.IsDir() {
			continue
		}
		if f.Size() <= 1024 {
			continue
		}
		fmt.Printf("%-25s\t%-10d\t+%-10d\n", f.Name(), f.Size(), f.Size()-1024)
		ret = 1
	}
	os.Exit(ret)
}
