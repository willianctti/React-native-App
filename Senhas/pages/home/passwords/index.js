import { View, Text, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import useStorage from '../../../hooks/useStorage'
import { FlatList } from 'react-native'
import {PasswordItem} from './components/passwordItem'

export function Passwords() {
    const [listPasswords, SetListPasswords] = useState([])
    const focused = useIsFocused();
    const { getItem, removeItem } = useStorage();

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await getItem("@PASS")
            SetListPasswords(passwords)
        }

        loadPasswords();

    }, [focused])



    async function handleDeletePassword(item) {
        const passwords = await removeItem('@PASS', item)
        SetListPasswords(passwords)
    }


    return (
        <SafeAreaView style={styles.backContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Minhas senhas
                </Text>
            </View>

            <View style={styles.content}>
                <FlatList style={
                    {
                        flex: 1,
                        paddingTop: 14
                    }
                }
                    data={listPasswords}
                    keyExtractor={(item) => String(item) }
                    renderItem={ ({item}) => <PasswordItem data={item} removePassword={() => handleDeletePassword(item)} /> }
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2CAB2C',
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14
    },
    backContainer: {
        flex: 1,
        backgroundColor: '#2D452D'

    }
})