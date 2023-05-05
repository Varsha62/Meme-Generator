import React from 'react'
import domtoimage from 'dom-to-image';
import icon from '../image/datasave.svg'

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "https://i.imgflip.com/30b1gx.jpg"
    })

    const [memeImgData, setMemeImgData] = React.useState([]);

    const [slider, setSlider] = React.useState({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontSize: 16
    })

    const labels = ["Top: ", "Left: ", "Right: ", "Bottom: ", "Font-Size: "]

    React.useEffect(() => {
        fetch(" https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(apiData => setMemeImgData(apiData.data.memes))
    }, [])

    function getImage() {
        const dataArr = memeImgData
        const randomNo = Math.floor(Math.random() * dataArr.length);
        const imgUrl = dataArr[randomNo].url;
        setMeme((prev) => {
            return ({ ...prev, randomImg: imgUrl })
        })
    }

    function handleSliderChange(e) {
        const { name, value } = e.target
        setSlider((prevData) => {
            return ({ ...prevData, [name]: value })
        })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme((prevData) => {
            return ({
                ...prevData, [name]: value
            })
        })
    }

    function downloadImg(){
        domtoimage.toJpeg(document.getElementById('image'),{quality:0.95})
        .then(function(dataUrl){
            var link=document.createElement('a');
            link.download='Meme.jpeg';
            link.href=dataUrl;
            link.click();
        });
    }

    const topTextStyles = {
        top: `${slider.top}%`,
        right: `${slider.right}%`,
        fontSize: `${slider.fontSize}%`,
        left: `${slider.left}%`
    }

    const bottomTextStyles = {
        bottom: `${slider.bottom}%`,
        right: `${slider.right}%`,
        fontSize: `${slider.fontSize}%`,
        left: `${slider.left}%`
    }

    return (
        <main>

            {/* input text 1st ke liye */}
            <div className='form'>
                <input type='text' className='input input-1' placeholder='Enter top line' name='topText' value={meme.topText}
                    onChange={handleChange} />
            </div>

            {/* input text 2nd ke liye */}
            <div className='form'>
                <input type='text' className='input input-2' placeholder='Enter bottom line' name='bottomText' value={meme.bottomText}
                    onChange={handleChange} />

                <button className="btn" onClick={getImage}>Get a new meme image 🖼️</button>

            </div>

            <div className='sys-container'>

                <div className='meme-img-container' id='image'>
                    <h2 className='top-text meme-text' style={topTextStyles}>{meme.topText}</h2>
                    <h2 className='bottom-text meme-text' style={bottomTextStyles}>{meme.bottomText}</h2>
                    <img src={meme.randomImg} alt='' className='meme-img' />

                </div>

                <div className='slider-container'>
                {/* Top ke liye */}
                    <label htmlFor='top'>{labels[0]}</label>
                    <input className='top range-slider'
                        type='range'
                        name='top'
                        value={slider.top}
                        onChange={handleSliderChange}
                    />
                    {/*  left*/}
                    <label htmlFor='left'>{labels[1]}</label>
                    <input className='left range-slider'
                        type='range'
                        name='left'
                        value={slider.left}
                        onChange={handleSliderChange}
                    />

                            {/* right */}

                    <label htmlFor='right'>{labels[2]}</label>
                    <input className='right range-slider'
                        type='range'
                        name='right'
                        value={slider.right}
                        onChange={handleSliderChange}
                    />

                    {/* bottom */}

                    <label htmlFor='bottom'>{labels[3]}</label>
                    <input className='bottom range-slider'
                        type='range'
                        name='bottom'
                        value={slider.bottom}
                        onChange={handleSliderChange}
                    />

            
                    {/* fontSize */}
                    <label htmlFor='font-size'>{labels[4]}</label>
                    <input className='font-size range-slider'
                        type='range'
                        name='fontSize'
                        value={slider.fontSize}
                        onChange={handleSliderChange}
                    />

                    <button id='download-btn' onClick={downloadImg}>
                        Download Meme
                        <img src={icon} id='icon'/>
                    </button>




                </div>

            </div>
        </main>
    )
}

