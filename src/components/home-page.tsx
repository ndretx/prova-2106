import { View, Text, FlatList, StyleSheet } from "react-native";
import { Image } from "expo-image"
import { useEffect, useState } from "react";
import CountryEntity from "../entity/country-entity";

export default function HomePage() {
    const [countries, setCountries] = useState<CountryEntity[]>([]);
    useEffect(() => {
        var requestOptions = {
            method: 'GET',

        };

        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                const countryList: CountryEntity[] = result.map(item => ({
                    id: item.name.common,
                    name: item.name.common,
                    ptName: item.translations.por.common,
                    capital: item.capital,
                    continent: item.region,
                    flagUrl: item.flags.png,
                    population: item.population,
                }));
                setCountries(countryList);
            })
            .catch(error => console.log('error', error));

    }, [])





    return (
        <View style={styles.container}>
            <Text style={styles.title}> Lista de Paises</Text>
            <FlatList renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image style={styles.flag} source={{ uri: item.flagUrl }}></Image>
                    <View style={styles.cardInfo}>
                    <Text style={styles.infoName}>{item.name}</Text>
                    <Text style={styles.info}>{item.ptName}</Text>
                    <Text style={styles.info}> capital: {item.capital}</Text>
                    <Text style={styles.info}>continente: {item.continent}</Text>
                    <Text style={styles.infoPop}>populaçao: {item.population}</Text>
                    </View>
                </View>

            )}
                data={countries}
                keyExtractor={item => item.id}

            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#bebebe',
        marginVertical: 10,
        borderRadius: 10,
       
    },
    cardInfo: {
        alignSelf: 'center',
        marginHorizontal: 10 ,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    title: {
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: '600',
        color: 'white',

    },
    flag: {
        
        alignSelf: 'flex-start',
        margin: 10,
        borderRadius: 10,
        width: "33%",
        height: '80%',


    },
    info: {
        fontSize: 13,
       
        
        
    },
    infoName: {
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    infoPop: {
        fontSize: 15,
        fontWeight: '600',
       
        color: "green",
    },

});
