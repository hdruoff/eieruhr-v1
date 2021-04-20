input.onButtonPressed(Button.A, function () {
    zeit += -10
    if (zeit < 1) {
        zeit = 10
    }
})
input.onGesture(Gesture.Shake, function () {
    if (einstellmodus) {
        einstellmodus = false
        start = input.runningTime()
    } else {
        einstellmodus = true
    }
})
input.onButtonPressed(Button.B, function () {
    zeit += 10
})
let restzeit = 0
let vergangene_sek = 0
let start = 0
let zeit = 0
let einstellmodus = false
einstellmodus = true
basic.forever(function () {
    if (!(einstellmodus)) {
        vergangene_sek = input.runningTime() - start / 1000
        restzeit = zeit - vergangene_sek
        if (restzeit <= 0) {
            while (!(einstellmodus)) {
                basic.showLeds(`
                    # . . . #
                    . # # # .
                    . . # . .
                    . # . # .
                    . . # . .
                    `)
                for (let index = 0; index < 4; index++) {
                    music.playTone(392, music.beat(BeatFraction.Sixteenth))
                    music.rest(music.beat(BeatFraction.Sixteenth))
                    basic.showLeds(`
                        . # . # .
                        . # # # .
                        . . # . .
                        . # . # .
                        . . # . .
                        `)
                    for (let index = 0; index < 4; index++) {
                        music.playTone(523, music.beat(BeatFraction.Sixteenth))
                        music.rest(music.beat(BeatFraction.Sixteenth))
                    }
                }
            }
        } else {
            basic.showNumber(restzeit)
        }
    } else {
        vergangene_sek = 10
        while (einstellmodus) {
            basic.showNumber(zeit)
        }
    }
})
