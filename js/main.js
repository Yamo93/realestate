
        let coverOn = false;
        let resultOn = false;

        // Städa upp koden efteråt (gör den mer skalbar)
        document.getElementById('houseimg_1').addEventListener('click', (e) => {

            if (!coverOn) {
            document.getElementById('houseimg_1').style.visibility = 'hidden';
            document.querySelector('.cover').style.opacity = '1';
            document.querySelector('.cover').style.zIndex = '10';
            document.querySelector('.cover-img').style.display = 'block';
            document.querySelector('.cover-img').setAttribute('src', 'img/house_1.jpg');
            document.querySelector('.cover-img').style.display = 'block';
            coverOn = true;
            }
        })
        document.getElementById('houseimg_2').addEventListener('click', (e) => {

            if (!coverOn) {
            document.getElementById('houseimg_2').style.visibility = 'hidden';
            document.querySelector('.cover').style.opacity = '1';
            document.querySelector('.cover').style.zIndex = '10';
            document.querySelector('.cover-img').setAttribute('src', 'img/house_2.jpg');
            document.querySelector('.cover-img').style.display = 'block';
            coverOn = true;
            }
        })
        document.getElementById('houseimg_3').addEventListener('click', (e) => {

            if (!coverOn) {
            document.getElementById('houseimg_3').style.visibility = 'hidden';
            document.querySelector('.cover').style.opacity = '1';
            document.querySelector('.cover').style.zIndex = '10';
            document.querySelector('.cover-img').setAttribute('src', 'img/house_3.jpg');
            document.querySelector('.cover-img').style.display = 'block';
            coverOn = true;
            }
        })
        document.getElementById('houseimg_4').addEventListener('click', (e) => {

            if (!coverOn) {
            document.getElementById('houseimg_4').style.visibility = 'hidden';
            document.querySelector('.cover').style.opacity = '1';
            document.querySelector('.cover').style.zIndex = '10';
            document.querySelector('.cover-img').setAttribute('src', 'img/house_4.jpg');
            document.querySelector('.cover-img').style.display = 'block';
            coverOn = true;
            }
        })

        document.querySelector('.cover').addEventListener('click', (e) => {
            if (!e.target.matches('.cover-img') && coverOn) {
                document.getElementById('houseimg_1').style.visibility = 'visible';
                document.getElementById('houseimg_2').style.visibility = 'visible';
                document.getElementById('houseimg_3').style.visibility = 'visible';
                document.getElementById('houseimg_4').style.visibility = 'visible';
                document.querySelector('.cover').style.opacity = '0';
                document.querySelector('.cover').style.zIndex = '-1';
                coverOn = false;
            }

            if (!e.target.matches('.result') && resultOn) {
                document.querySelector('.cover').style.opacity = '0';
                document.querySelector('.cover').style.zIndex = '-1';
                document.querySelector('.result').style.display = 'none';
                resultOn = false;
            }
            
        })

        let imageShown = false;

        window.onkeyup = function(e) {
            if (e.keyCode === 27) {
                document.getElementById('houseimg_1').style.visibility = 'visible';
                document.getElementById('houseimg_2').style.visibility = 'visible';
                document.getElementById('houseimg_3').style.visibility = 'visible';
                document.getElementById('houseimg_4').style.visibility = 'visible';
                document.getElementById('img1').style.visibility = 'visible';
                document.getElementById('img2').style.visibility = 'visible';
                document.querySelector('.cover').style.opacity = '0';
                document.querySelector('.cover').style.zIndex = '-1';
                document.querySelector('.result').style.display = 'none';
                coverOn = false;
                imageShown = false;
            }
        }
        // Anslut till Eniros API för att söka efter mäkleribolag i olika städer (resultaten ska visas i en modal typ)

        // [STATE: DONE] Lägg JS i separat fil.

        // Lägg till responsivitet

        // Lägg till smooth-scroll, mobil navigation etc, pilen som man kan klicka på som för en smoothly till toppen


        document.body.addEventListener('click', (e) => {
            if (e.target.matches('#img1')) {
                if (!imageShown) {

                    document.getElementById('img1').style.visibility = 'hidden';
                    document.querySelector('.cover').style.opacity = '1';
                    document.querySelector('.cover').style.zIndex = '10';
                    document.querySelector('.cover-img').style.display = 'block';
                    document.querySelector('.cover-img').setAttribute('src', 'img/top_img_building.jpg');
                    document.querySelector('.cover-img').style.display = 'block';
                    imageShown = true;
                } 
            }
            if (e.target.matches('.cover') && imageShown) {
                document.getElementById('img1').style.visibility = 'visible';
                document.getElementById('img2').style.visibility = 'visible';
                document.querySelector('.cover').style.opacity = '0';
                document.querySelector('.cover').style.zIndex = '-1';
                imageShown = false;
            }

            if (e.target.matches('#img2')) {
                if (!imageShown) {
                    document.getElementById('img2').style.visibility = 'hidden';
                    document.querySelector('.cover').style.opacity = '1';
                    document.querySelector('.cover').style.zIndex = '10';
                    document.querySelector('.cover-img').style.display = 'block';
                    document.querySelector('.cover-img').setAttribute('src', 'img/small_img_building_one.jpg');
                    document.querySelector('.cover-img').style.display = 'block';
                    imageShown = true;
                }
            }
        });


document.querySelector('.estimate__options-search').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        document.querySelector('.cover').style.opacity = '1';
        document.querySelector('.cover').style.zIndex = '10';
        document.querySelector('.cover-img').style.display = 'none';
        document.querySelector('.result').style.display = 'block';

        resultOn = true;

        let value = e.target.value;

        document.querySelector('.result__query').textContent = `Du sökte efter fastigheter i: ${value}`;

        const response = fetch(`https://api.eniro.com/cs/search/basic?profile=Yamo93&key=1899704344420551163&country=se&version=1.1.3&to_list=5&from_list=1&search_word=fastighet&geo_area=${e.target.value}`).then(res => res.json()).then(data => {
            const fetchedData = data;
            console.log(fetchedData.adverts);

            fetchedData.adverts.forEach(company => {
                let markup = `
                <li class="result__list-item">
                        <h3 class="result__list-item--title">${company.companyInfo.companyName}</p>
                            <p class="result__list-item--address">Adress: ${company.address.streetName}, ${company.address.postCode} ${company.address.postArea}</p>
                            <p class="result__list-item--link">
                                Länk: <a href="${company.homepage}" target="_blank">Klicka här</a>
                            </p>
                </li>
                `;

                document.querySelector('.result__list').insertAdjacentHTML('beforeend', markup);
            })
        });
    }
}) 