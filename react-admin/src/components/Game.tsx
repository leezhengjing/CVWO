import { Chess } from "chess.js";
import { useCallback, useState } from "react";
import ChessAnalysisBoard from "react-chess-analysis-board";


export default function Game(props: { pgnString: string }) {

    return (
        <div>
            <ChessAnalysisBoard
                pgnString={props.pgnString}
                config={{
                    boardHeaderConfig: {
                        useHoodieGuyWhenUnknown: true
                    },
                    boardConfig: {
                        ChessBoardProps: {
                            showBoardNotation: true,
                            boardOrientation: 'black',
                        }
                    }
                }}
                styles={{
                    boardHeaderStyles: {
                        boardHeaderContainerClassName: 'board-header-container',
                        boardHeaderTextClassName: 'board-header-text',
                        boardHeaderTextDetailClassName: 'board-header-text-detail'
                    },
                    panelStyles: {
                        panelContainerClassName: 'panel-container'
                    }
                }}
            />
            <br />
        </div>
    );
}

