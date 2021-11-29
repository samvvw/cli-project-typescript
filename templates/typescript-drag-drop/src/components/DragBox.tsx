import { useState } from 'react'
export default function DragBox(): JSX.Element {
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [bottom, setBottom] = useState(0)

    const boxStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 150,
        width: 150,
        backgroundColor: 'green',
        color: 'white',
        userSelect: 'none',
        zIndex: '1100',
        cursor: 'grab',
    }

    function mouseDown(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()

        const position: { [pos: number]: number | null } = {
            1: null,
            2: null,
            3: null,
            4: null,
        }

        const el = e.target as HTMLElement

        el.style.cursor = 'grabbing'

        position[3] = e.clientX
        position[4] = e.clientY
        document.onmouseup = function (evmu: MouseEvent) {
            evmu.preventDefault()
            document.onmouseup = null
            document.onmousemove = null
            el.style.cursor = 'grab'
        }

        document.onmousemove = function (emv: MouseEvent): void {
            if (emv.shiftKey) console.log(position)
            emv.preventDefault()
            if (position[3] && position[4]) {
                position[1] = position[3] - emv.clientX
                position[2] = position[4] - emv.clientY
                position[3] = emv.clientX
                position[4] = emv.clientY

                setLeft((el.offsetLeft / window.innerWidth) * 100)

                setTop((el.offsetTop / window.innerHeight) * 100)
                setRight(
                    ((el.offsetLeft + el.getBoundingClientRect().width) /
                        window.innerWidth) *
                        100
                )
                setBottom(
                    ((el.offsetTop + el.getBoundingClientRect().height) /
                        window.innerWidth) *
                        100
                )

                el.style.top = el.offsetTop - position[2] + 'px'
                el.style.left = el.offsetLeft - position[1] + 'px'
            }
        }
    }

    return (
        <div style={boxStyle} onMouseDown={mouseDown}>
            <p
                style={{
                    position: 'relative',
                    zIndex: '-10',
                    pointerEvents: 'none',
                }}
            >
                Left:{Math.round(left)}
            </p>
            <p
                style={{
                    position: 'relative',
                    zIndex: '-10',
                    pointerEvents: 'none',
                }}
            >
                Top:{Math.round(top)}
            </p>
            <p
                style={{
                    position: 'relative',
                    zIndex: '-10',
                    pointerEvents: 'none',
                }}
            >
                Right:{Math.round(right)}
            </p>
            <p
                style={{
                    position: 'relative',
                    zIndex: '-10',
                    pointerEvents: 'none',
                }}
            >
                Bottom:{Math.round(bottom)}
            </p>
        </div>
    )
}
