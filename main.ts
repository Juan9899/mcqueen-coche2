radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
        mcqueen_anda = 1
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (receivedNumber == 2) {
        maqueen.motorStop(maqueen.Motors.All)
        mcqueen_anda = 0
        basic.showIcon(IconNames.No)
    } else if (receivedNumber == 3) {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # . #
            . . . # .
            . . # . .
            `)
        if (mcqueen_anda == 1) {
            maqueen.motorStop(maqueen.Motors.All)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 120)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
        } else if (mcqueen_anda == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 120)
            maqueen.motorStop(maqueen.Motors.M2)
        }
    } else if (receivedNumber == 4) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # . # # #
            . # . . .
            . . # . .
            `)
        if (mcqueen_anda == 1) {
            maqueen.motorStop(maqueen.Motors.All)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
        } else if (mcqueen_anda == 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
            maqueen.motorStop(maqueen.Motors.M1)
        }
    } else if (receivedNumber == 7) {
        maqueen.motorStop(maqueen.Motors.All)
        Siguelinea = 0
    } else if (receivedNumber == 8) {
        Siguelinea = 1
    }
})
let Siguelinea = 0
let mcqueen_anda = 0
radio.setGroup(86)
mcqueen_anda = 0
Siguelinea = 0
music.playMelody("E B C5 A B G A F ", 120)
basic.showString("hola")
basic.forever(function () {
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    basic.pause(100)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    basic.pause(100)
})
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 6) {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        radio.sendNumber(9)
    }
})
basic.forever(function () {
    if (Siguelinea == 1) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 20)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 20)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorStop(maqueen.Motors.M1)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 20)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorStop(maqueen.Motors.All)
        }
    }
})
