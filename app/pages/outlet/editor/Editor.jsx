import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
/** Подключение стилей */
import noDataStyle from "../style/css/NoData.module.css";
import css from "./css/Editor.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
import toBase64 from "../../../components/toBase64.jsx";
/** Подключение API */
import { addNewArticle, deleteArticleById, getArticleById, setArticleById, setStatusArticle } from "../../../api/aPost.jsx";

export default function Editor() {
    const navigate = useNavigate();
    const location = window.location.pathname;

    const { id } = useParams();
    const { localId } = useContext(LocalUserContext);
    const { setPageTitle, darkTheme } = useContext(AppContext);

    const [ article, setArticle ] = useState(null);
    const [ articleId, setArticleId ] = useState(false);
    const [ isPublick, setIsPublic ] = useState(true);

    const [ content, setContent ] = useState(null);
    const [ loader, setLoader ] = useState(true);

    const [ img, setImg ] = useState("https://www.raisin.digital/wp-content/uploads/placeholder.svg");
    const [ name, setName ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ difficulty, setDifficulty ] = useState(1);
    const [ calories, setCalories ] = useState(null);
    const [ minutes, setMinutes ] = useState(null);
    const [ steps, setSteps ] = useState([""]);
    const [ isDraf, setIsDraf ] = useState(true);
    const [ ingredients, setIngredients ] = useState([{ name:null, amount:0, unit:"kg" }]);

    const onImg = async function (target) {
        let file = target.files[0];
        let result = await toBase64(file);
        setImg(result);
    }

    const addIngredient = () => {
        setIngredients([ ...ingredients, { name:null, amount:0, unit:"kg" } ])
    }

    const editIngredients = (index, key, value) => {
        let s = ingredients.map((m,i) => {
            if (i === index) m[key] = value;
            return m;
        });
        setIngredients(s);
    }

    const deleteIngredient = (index) => {
        if (ingredients.length !== 1) {
            let s = ingredients.filter((f,i) => i!==index);
            setIngredients(s);
        }
    }

    const addSetp = () => {
        setSteps([ ...steps, null ])
    }

    const changeStep = (value, index) => {
        let s = steps.map((m,i) => i===index ? value : m);
        setSteps(s);
    }

    const deleteStep = (index) => {
        if (steps.length !== 1) {
            let s = steps.filter((f,i) => i!==index);
            setSteps(s);
        }
    }

    useEffect(
        () => {
            if (+id) {
                setPageTitle("Edit post");
                setArticleId(+id);
            } else setPageTitle("Add post");
        },
        []
    );

    useEffect(
        () => {
            if (articleId) {
                setLoader(true);
                getArticleById(articleId, localId, setArticle, setLoader, navigate);
            } else setLoader(false);
        },
        [ articleId, localId ]
    );

    useEffect(
        () => {
            /** Если локальный id пользователя не равен id создателя статьи */
            if (article && +article.user.id !== +localId) {
                navigate("/");
            } else if (article) {
                setImg( article.img );
                setName( article.name );
                setDescription( article.description );
                setIngredients( article.ingredients );
                setMinutes( article.minutes );
                setCalories( article.calories );
                setSteps( article.steps );
                setIsDraf( article.isdraft );
                setIsPublic( article.isdraft );
            }
        },
        [ article ]
    );

    useEffect(
        () => {
            if (!loader) {
                setContent(
                    <div className={ [css.wrap,darkTheme?css.dark:css.light].join(" ") }>
                        <h1 className={ css.header }>{ articleId ? "Edit article" : "New article" }</h1>
                        <div className={ css.form }>
                            <fieldset className={ css.avatar }>
                                <div className={ css.img }><img src={ img } alt="avatar" /></div>
                                <span className={ css.description }>The image will be stretched more when you view the article</span>
                                <label htmlFor="avatar">Upload file</label>
                                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={ (e) => onImg(e.target) }></input>
                            </fieldset>
                            <div className={ css.item }>
                                <fieldset className={ css.input }>
                                    <label htmlFor="name">Name</label>
                                    <input type="search" defaultValue={ name } placeholder="Enter name" id="name" onChange={ (e) => setName(e.target.value) }/>
                                </fieldset>
                                <fieldset className={ css.input }>
                                    <label htmlFor="description">Description</label>
                                    <textarea defaultValue={ description } placeholder="Enter description" id="description" onChange={ (e) => setDescription(e.target.value) }/>
                                </fieldset>
                                <fieldset className={ [css.input, css.row].join(" ") }>
                                    <label htmlFor="calories">Calories</label>
                                    <input type="number" defaultValue={ calories } min={0} placeholder="0" id="calories" onChange={ (e) => setCalories(e.target.value) }/>
                                </fieldset>
                                <fieldset className={ [css.input, css.row].join(" ") }>
                                    <label htmlFor="time">Сooking time</label>
                                    <input type="number" defaultValue={ minutes } min={0} placeholder="0" id="time" onChange={ (e) => setMinutes(e.target.value) }/>
                                    <i>min</i>
                                </fieldset>
                                <fieldset className={ css.difficulty }>
                                    <label htmlFor="difficulty">Diffivulty</label>
                                    <select name="difficulty" id="difficulty" defaultValue={ difficulty } onChange={ (e) => setDifficulty(e.target.value) }>
                                        <option value="1">Easily (1 lvl)</option>
                                        <option value="2">Medium (2 lvl)</option>
                                        <option value="3">Difficult (3 lvl)</option>
                                    </select>
                                </fieldset>
                            </div>

                            <div className={ css.ingredients }>
                                <p className={ css.title }><i>the</i><i>Ingredients</i></p>
                                <span className={ css.description }>The article must contain more than 1 ingredient</span>
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Unit</th>
                                        </tr>
                                    </thead>
                                    
                                    { 
                                        <GetIngredients 
                                            ingredients={ ingredients }
                                            deleteIngresient={ deleteIngredient }
                                            editIngredients={ editIngredients }
                                        /> 
                                    }
                                </table>

                                <button className={ css.button } onClick={ () => addIngredient() }>Add ingredient</button>
                            </div>

                            <div className={ css.steps }>
                                <p className={ css.title }><i>the</i><i>Process</i></p>
                                <span className={ css.description }>The article must contain more than 1 step</span>
                                { 
                                    <GetSteps 
                                        steps={ steps }
                                        deleteStep={ deleteStep }
                                        changeStep={ changeStep }
                                    /> 
                                }

                                <button className={ css.button } onClick={ () => addSetp() }>Add steps</button>
                            </div>
                            
                            <div className={ css.save }>
                                {
                                    article
                                    ?   <button 
                                            className={ css.edit } 
                                            onClick={ () => onEditArticle(localId, articleId, img, name, description, difficulty, calories, minutes, steps, isDraf, ingredients, navigate) }
                                        >Edit article</button>
                                    :   <button 
                                            className={ css.add }
                                            onClick={ () => onAddArticle(localId, navigate, steps, ingredients, img, name, description, difficulty, calories, minutes) }
                                        >Add article</button>
                                }

                                {
                                    article &&
                                    <button 
                                        className={ css.unpublic } 
                                        onClick={ () => onChangeStatusArticle(articleId, isPublick, setIsPublic) }
                                    >{ isPublick ? "Public article" : "Unpublic article" }</button>
                                }

                                { 
                                    article && 
                                    <button 
                                        className={ css.delete } 
                                        onClick={ () => onDeleteArticle(articleId, localId, navigate) }
                                    >Delete article</button> 
                                }
                            </div>
                        </div>
                    </div>
                );
            } else {
                setContent(
                    <div className={ noDataStyle.loader }>
                        <main></main>
                    </div>
                );
            }
        },
        [ img, steps, ingredients, loader, darkTheme ]
    );

    return content;
}

/* -------------------------------------------------------------------------- */

function GetIngredients({ingredients, deleteIngresient, editIngredients}) {
    return (
        <tbody>
            {
                ingredients.map((m,i) => {
                    return (
                        <tr key={i}>
                            <td className={ css.delete }><button className={ css.delete } onClick={ () => deleteIngresient(i) }><i>x</i></button></td>
                            <td><input type="search" value={ m.name ?? '' } placeholder="Enter name" onChange={ (e) => editIngredients(i, "name", e.target.value) }/></td>
                            <td><input type="number" min={1} value={ +m.amount === 0 ?'':+m.amount } placeholder="0" onChange={ (e) => editIngredients(i, "amount", e.target.value) }/></td>
                            <td>
                                <select name="unit" id="unit" defaultValue={ m.unit } onChange={ (e) => editIngredients(i, "unit", e.target.value) }>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="l">l</option>
                                    <option value="ml">ml</option>
                                    <option value="pcs">pcs</option>
                                </select>
                            </td>
                        </tr>
                    );
                })
            }
        </tbody>
    );
}

function GetSteps({ steps, deleteStep, changeStep }) {
    return (
        <div>
            {
                steps.map((m,i) => {
                    return (
                        <div key={`step-${i}`} className={ css.item_steps }>
                            <p>
                                {i+1} step
                                <button className={ css.delete } onClick={ () => deleteStep(i) }><i>x</i></button>
                            </p>
                            <textarea 
                                placeholder="Ented step..." 
                                value={m ?? ''}
                                onChange={ (e) => changeStep(e.target.value, i) }
                            ></textarea>
                        </div>
                    );
                })
            }
        </div>
    );
}

/* -------------------------------------------------------------------------- */

function onChangeStatusArticle(id, isdraf, setIsPublic) {
    setStatusArticle(id, isdraf, setIsPublic);
}

function onEditArticle(localId, articleId, img, name, description, difficulty, calories, minutes, steps, isDraf, ingredients, navigate) {
    let filterStep = steps.filter(f => !!f);
    let filterIngr = ingredients.filter(f => !!f["name"]);

    if (name && 
        calories>0 &&
        minutes>0 && 
        filterStep.length>1 && 
        filterIngr.length>1) {
            setArticleById(
                navigate,
                localId, 
                articleId, 
                {
                    img:img, 
                    name:name, 
                    description:description, 
                    difficulty:difficulty, 
                    calories:calories, 
                    minutes:minutes, 
                    steps:filterStep, 
                    isdraft:isDraf, 
                    ingredients:filterIngr
                }
            );
        }
}

function onDeleteArticle(articleId, localId, navigate) {
    if (articleId && typeof articleId === "number") {
        deleteArticleById(navigate, articleId, localId);
    }
}

function onAddArticle(localId, navigate, steps, ingredients, img, name, description, difficulty, calories, minutes) {
    let filterStep = steps.filter(f => !!f);
    let filterIngr = ingredients.filter(f => !!f["name"]);

    if (name && 
        calories>0 &&
        minutes>0 && 
        filterStep.length>1 && 
        filterIngr.length>1) addNewArticle(navigate, img, name, description, difficulty, calories, minutes, filterStep, true, filterIngr, localId);
}

