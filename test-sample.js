let dataArray = [
    {description:'ảnh mèo 1',
    src:"https://vcdn-vnexpress.vnecdn.net/2021/03/02/103650164-731814290963011-1374-5806-7233-1614677857.jpg"
}, 
    {description:'ảnh mèo 2',
    src:"http://cdn.tgdd.vn/Files/2021/04/22/1345402/8-giong-meo-dep-va-pho-bien-duoc-yeu-thich-o-viet-nam-202206071020086367.jpg"},

    {description:'ảnh mèo 3',src:"https://fridaycat.com.vn/wp-content/uploads/2021/04/meo-muop-giong-meo-pho-bien-tren-the-gioi.jpg"
}];

let jsonString = JSON.stringify(dataArray);
console.log(typeof(jsonString));
let feature = document.querySelector(".featured");
const featuredHTML = dataArray.map(data=> {
     data = `
<li>
<div class="featured-content">
<img src = ${data.src} style = "height:300px ; width = 150px ">
<p class= "desription" >${data.description}</p>
</div>
</li>

`   
//console.log(data);
return data;
});
//console.log(featuredHTML);
let html = featuredHTML.toString();
//console.log(html);
const finalHTML = html.replaceAll(',',' ');
//console.log(finalHTML);
feature.innerHTML = `<ul>
${finalHTML}
</ul>`
