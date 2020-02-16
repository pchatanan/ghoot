import React from 'react'
import { fs } from '..'
import { useDispatch } from 'react-redux'
import { dismissLoadingScreen, setLoadingScreen, setDialogScreen } from '../redux/actions'
import firebase from 'firebase/app'
import 'firebase/firestore'

const useHomeLogic = (playerName, passcode) => {
    const dispatch = useDispatch()
    const [ownerId, setOwnerId] = React.useState()
    
    const [game, setGame] = React.useState()
    const [roomId, setRoomId] = React.useState()
    
    const [ownerStatus, setOwnerStatus] = React.useState()
    const gameId = React.useMemo(() => ownerStatus && ownerStatus.gameId, [ownerStatus])
    // Listen to game owner's status
    React.useEffect(() => {
        console.log('Listen to account status')
        if (ownerId) {
            return fs.collection('users').doc(ownerId).onSnapshot(doc => {
                console.log('owner status change')
                const newOwnerStatus = doc.data()
                console.log(newOwnerStatus)
                if (newOwnerStatus.status === 'idle') {
                    setOwnerId(null)
                }
                setOwnerStatus(newOwnerStatus)
                dispatch(dismissLoadingScreen())
            })
        }
    }, [ownerId, dispatch])
    // Listen to game status
    React.useEffect(() => {
        console.log('Listen to game status')
        if (ownerId && gameId) {
            return fs.collection('users').doc(ownerId).collection('games').doc(gameId).onSnapshot(doc => {
                setGame(doc.data())
            })
        }

    }, [ownerId, gameId])
    // On submit
    const onSubmit = React.useCallback(e => {
        dispatch(setLoadingScreen('finding room'))
        fs.collection('rooms').where('status', '==', 'waiting').where('passcode', '==', passcode.value).get()
            .then(querySnapshot => {
                if(querySnapshot.empty){
                    dispatch(dismissLoadingScreen())
                    dispatch(setDialogScreen('No room with this passcode', () => {
                        passcode.reset()
                    }))
                }
                else if (querySnapshot.size > 1) {
                    dispatch(dismissLoadingScreen())
                    dispatch(setDialogScreen('There are more than 1 room with this passcode.', () => {
                        playerName.reset()
                    }))
                }
                else if (querySnapshot.size === 1) {
                    dispatch(setLoadingScreen('room found'))
                    var retrivedRoomId = null;
                    var retrivedOwnerId = null;
                    querySnapshot.forEach(doc => {
                        retrivedRoomId = doc.id
                        retrivedOwnerId = doc.data().owner
                        setRoomId(retrivedRoomId)
                    })
                    // Create a reference to the SF doc.
                    var docRef = fs.collection('rooms').doc(retrivedRoomId).collection('players').doc(playerName.value);

                    fs.runTransaction(async (transaction) => {
                        // This code may get re-run multiple times if there are conflicts.
                        const playerDoc = await transaction.get(docRef)
                        if (playerDoc.exists) {
                            throw new Error("This name already exists!")
                        }
                        else {
                            return transaction.set(docRef, {
                                name: playerName.value,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                score: 0
                            })
                        }
                    }).then(() => {
                        dispatch(setLoadingScreen('entering'))
                        console.log("Transaction successfully committed!");
                        console.log('Player added to the room')
                        setOwnerId(retrivedOwnerId)
                        console.log('enter room')
                    }).catch((error) => {
                        console.log("Transaction failed: ", error);
                        dispatch(dismissLoadingScreen())
                    });
                }
            })
            e.preventDefault()
    }, [passcode, playerName, dispatch])
    return {game, onSubmit, ownerStatus, roomId}
}

export default useHomeLogic