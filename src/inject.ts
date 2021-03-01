import { Compare, ConditionAnd, ConditionCompare, ConditionElement, ConditionNot, Unknown } from '@quantleaf/query-result'
import { RepositorySearch, AdvancedSearch, UserSearch, IssueAndPrSearch, CodeSearch, allFieldsKey, allFieldsExactMatchKey, userSchemaKey, generalSchemaKey, issueSchemaKey, repoSchemaKey, codeSchemaKey, topicSchemaKey, userNameFields, TopicSearch, commitSchemaKey, CommitSearch, DiscussionSearch, discussionSchemaKey, } from './advanced-search-schema'; //   
import { translate, config, generateSchema, Field } from '@quantleaf/query-sdk-node';
import { QueryResponse } from '@quantleaf/query-request';
import { StandardDomain } from '@quantleaf/query-schema';

//Models
interface ReadableRepresentation {
    from?: string,
    query: string,
    errors: string[]
}
interface ParsedQuery {
    queryParams?: QueryParam[];
}
interface QueryParam {
    key: string,
    value: string
}
interface QuerySession {
    lastReadableQuery?: ReadableRepresentation,
    lastResponse?: QueryResponse;
    parsedQuery?: ParsedQuery
}


interface QueryStatus {
    faults: string[]
}
// URL
const urlSearchPath = "/search";
const redirectFromQueryKey = 'fromql';
const resultTypeQueryKey = 'type';
const querQueryKey = 'q';


const maxSearchLength = 250;

// Settings
const debounceTime = 200; //ms
const api = 'https://api.query.quantleaf.com';
const apiKeySetupFunction = async () => {
    await fetch(api + '/auth/key/demo').then((resp) => resp.text().then((apiKey) => { config(apiKey); return apiKey })).catch((e) => {console.error(e); serviceError = true; return null; });
}
var apiKeySetup = apiKeySetupFunction();

// State

var serviceError = false;
var sess: QuerySession = {}
//var lastRequestTime: number = new Date().getTime();
var lastSuggestions: string | undefined;
//var limitedSuggestions: boolean = false;

var searchFields: HTMLInputElement[] = [];
var restoredSearchFields:Set<number> = new Set();
var lastFocusedSearchField: HTMLInputElement;

var hasTypedAnything = false;
var load: Promise<any>;
var advancedSearchResultFocused = false;
var suggestionViewToggleFocused = false;

var lastSelectedAutoCompleteOption = 0;
var ctrlDown = false;
var showAllSuggestions = false;

var lastSearch: (string | undefined) = undefined;
var lastSelectionStart = -1;

var lastSearchFromUrl: (string | undefined) = undefined; 

// UI (nasty since we are manipulating DOM and are not injecting html with iframes)
const eventListenerTag = '__ql__'
const focusedColor = 'var(--color-bg-info-inverse)';
const focusedTextColor = 'var(--color-text-white)';
const backgroundColor = 'var(--color-bg-primary)';
const textColor = 'var(--color-auto-black)';

const searchResultBoxShadow = 'inset 0px 7px 3px -5px rgb(50 50 50 / 16%)';
var advancedSearchResultContainer = document.createElement('li')
advancedSearchResultContainer.style.display = 'flex';
advancedSearchResultContainer.style.flexDirection = 'column'
advancedSearchResultContainer.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
advancedSearchResultContainer.style.width = '100%';
advancedSearchResultContainer.style.color = textColor;
advancedSearchResultContainer.style.padding = '15px';
advancedSearchResultContainer.style.backgroundColor = backgroundColor;
advancedSearchResultContainer.style.position = 'relative';
advancedSearchResultContainer.style.zIndex = '101';
advancedSearchResultContainer.style.boxShadow = searchResultBoxShadow;
advancedSearchResultContainer.style.border = '1px solid var(--color-border-primary)';
advancedSearchResultContainer.style.borderTop = 'none';

advancedSearchResultContainer.style.cursor = 'pointer';
advancedSearchResultContainer.style.borderRadius = '6px';
advancedSearchResultContainer.style.color = textColor;

advancedSearchResultContainer.onmouseenter = () => {

    advancedSearchResultFocused = true;
    unfocusDefaultAutoCompleteOptions();

    updateAutoCompleteStyle();
}

advancedSearchResultContainer.onmouseleave = () => {
    advancedSearchResultContainer.style.backgroundColor = backgroundColor;
    advancedSearchResultContainer.style.color = textColor;
    advancedSearchResultFocused = false;
    updateAutoCompleteStyle();

}






var header = document.createElement('div');
header.style.display = 'flex';
header.style.flexDirection = 'row'
header.style.width = '100%';
var title = document.createElement('span');
title.innerHTML = 'Advanced Search'
title.style.fontWeight = '600';

header.appendChild(title);

var loadingSpinner = document.createElement('div');
const spinner = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" style=\"margin: auto; background: none; display: block; shape-rendering: auto;\" width=\"20px\" height=\"20px\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\">\r\n<g transform=\"rotate(0 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(30 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(60 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(90 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(120 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(150 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(180 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(210 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(240 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(270 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(300 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g><g transform=\"rotate(330 50 50)\">\r\n  <rect x=\"47\" y=\"18\" rx=\"3\" ry=\"6\" width=\"6\" height=\"12\" fill=\""+textColor+"\">\r\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\"><\/animate>\r\n  <\/rect>\r\n<\/g>\r\n<\/svg>";
var loadingSpinnerSvg = document.createElement('div');
loadingSpinnerSvg.style.marginLeft = '4px';
loadingSpinnerSvg.style.marginRight = '4px';

loadingSpinnerSvg.style.marginTop = '2px';
loadingSpinnerSvg.innerHTML = spinner;
var loadingSpinnerText = document.createElement('span');
loadingSpinnerText.innerHTML = 'Loading'
loadingSpinnerText.style.fontStyle = 'italic';
loadingSpinnerText.style.fontSize = '10pt';
loadingSpinner.style.marginLeft = 'auto';
loadingSpinner.style.display = 'flex'
loadingSpinner.style.flexDirection = 'row'
loadingSpinner.style.alignItems = 'center'
loadingSpinner.style.height = '20px';
loadingSpinner.style.marginRight = '-4px';
loadingSpinner.appendChild(loadingSpinnerText);
loadingSpinner.appendChild(loadingSpinnerSvg);


advancedSearchResultContainer.appendChild(header);


const showAllSuggestionsHTML = 'Show more';
const hideAllSuggetsionsHTML = 'Show less';

var suggestionViewToggle = document.createElement('span');
suggestionViewToggle.innerHTML = showAllSuggestionsHTML;;
suggestionViewToggle.style.cursor = "pointer";
suggestionViewToggle.style.border = '1px solid #aeb0b5';
suggestionViewToggle.style.padding = '2px';
suggestionViewToggle.style.fontSize = '7pt';
suggestionViewToggle.style.margin = '3px';
suggestionViewToggle.style.backgroundColor = backgroundColor;
suggestionViewToggle.style.whiteSpace = 'pre'
suggestionViewToggle.onmouseenter = () => {

    suggestionViewToggleFocused = true;
    updateAutoCompleteStyle();
};

suggestionViewToggle.onmouseleave = () => {
    suggestionViewToggleFocused = false;
    updateAutoCompleteStyle();

};
suggestionViewToggle.onmousedown = (e) => {
    showAllSuggestions = !showAllSuggestions;
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    printSuggestions();
}


var suggestionsContainer = document.createElement('span');
suggestionsContainer.innerHTML = ''
var suggestionsWrapper = document.createElement('div');
suggestionsWrapper.style.minHeight = '60px'
suggestionsWrapper.appendChild(suggestionsContainer)
advancedSearchResultContainer.appendChild(suggestionsWrapper);

var textContainer = document.createElement('code');
advancedSearchResultContainer.appendChild(textContainer);
textContainer.style.whiteSpace = "pre-wrap";
textContainer.style.wordWrap = "break-word";
textContainer.style.paddingTop = "10px";
textContainer.style.fontSize = '14px !important'
textContainer.style.paddingBottom = "10px";
textContainer.style.fontSize = "14px";
//textContainer.style.fontWeight = "bold";

var footer = document.createElement('div');
footer.style.fontStyle = "italic";
footer.style.marginLeft = "auto";
footer.style.marginTop = "5px";
footer.style.lineHeight = "8pt";
footer.style.whiteSpace = "normal";
footer.style.fontSize = '10pt';
footer.style.display = 'flex';
footer.style.flexDirection = 'column';
footer.style.opacity = '0.75';

var helpButton = document.createElement('span');
helpButton.innerHTML = 'Help'
helpButton.style.marginLeft = "auto";
helpButton.style.marginBottom = "4px";
helpButton.style.cursor = "pointer";
helpButton.onmouseenter = () => {
    helpButton.style.textDecoration = 'underline'
};


helpButton.onmouseleave = () => {
    helpButton.style.textDecoration = ''
};
helpButton.onmousedown = (e) => {

    e.stopImmediatePropagation();
    e.preventDefault();
    chrome.runtime.sendMessage("__new_help_tab__");
}

var donationDiv = document.createElement('span')
donationDiv.innerHTML = 'Coffee';
donationDiv.style.marginLeft = "auto";
donationDiv.style.marginBottom = "4px";
donationDiv.style.cursor = "pointer";
donationDiv.style.borderRadius = "2px";

donationDiv.onmouseenter = () => {
    donationDiv.style.textDecoration = 'underline'
};


donationDiv.onmouseleave = () => {
    donationDiv.style.textDecoration = ''
};

donationDiv.onmousedown = (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    chrome.runtime.sendMessage("__new_donation_tab__");
};


footer.appendChild(helpButton);
footer.appendChild(donationDiv);
advancedSearchResultContainer.appendChild(footer);


const unfocusDefaultAutoCompleteOptions = () => {
    const defaultList = getDefaultAdvancedSearchAutoCompleteList(lastFocusedSearchField);
    for (let i = 0; i < defaultList?.children.length; i++) {
        const element = defaultList?.children[i];
        (element as HTMLElement)?.classList.remove("navigation-focus");
        (element as HTMLElement)?.setAttribute('aria-selected', 'false');
    }
}

const focusLastDefaultAutoCompleteOption = () => {
    const defaultList = getDefaultAdvancedSearchAutoCompleteList(lastFocusedSearchField);
    if (defaultList) {
        const element = defaultList.lastElementChild;
        (element as HTMLElement)?.classList.add("navigation-focus");
        (element as HTMLElement)?.setAttribute('aria-selected', 'true');
    }
}
/*
const  getPathTo = (element) => {
    if (element.id!=='')
        return 'id("'+element.id+'")';
    if (element===document.body)
        return element.tagName;

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
}*/



const loading = () => {
    unloading();
    header.appendChild(loadingSpinner);
}

const unloading = () => {
    try {
        header.removeChild(loadingSpinner);
    } catch (error) {
        // does not exist   
    }
}

// The search experience, code that define the translation to natural language to the generalized query structure
// and code that transform the generalized query structure into google query syntax

// The schema we want to search on
let schemaObjects = [new TopicSearch(), new DiscussionSearch(), new IssueAndPrSearch(), new RepositorySearch(), new CodeSearch(), new UserSearch(), new CommitSearch(), new AdvancedSearch()]
const generatedSchemas = schemaObjects.map(s => generateSchema(s));

// Map by key 
const fieldsByKey: Map<string, Map<string, Field>> = new Map();
generatedSchemas.forEach((s) => {
    const schemaMap: Map<string, Field> = new Map();
    s.fields.forEach((f) => {
        if (f.key)
            schemaMap.set(f.key, f);
    });
    if (s.name.key)
        fieldsByKey.set(s.name.key, schemaMap);
})

//const fieldIsDate = (field:Field) => field.domain = StandardDomain.DATE;


const fromSession = () => {
    const url = new URL(window.location.href).searchParams.get(redirectFromQueryKey);
    if (url)
        return decodeURI(url);
    return undefined;
};

const preRestoreFormUrl = () => {
    lastSearchFromUrl =  fromSession();

}


const restoreLastSearchQuery = async (searchField: HTMLInputElement) => {

    if (hasTypedAnything) {
        return;
    }
    
    if (lastSearchFromUrl && !restoredSearchFields.has(searchFields.indexOf(searchField))) {
        restoreSearchFieldText(searchField, lastSearchFromUrl);
        getResults(searchField, lastSearchFromUrl);
        restoredSearchFields.add(searchFields.indexOf(searchField));

    }
}

const debounce = <T extends (...args: any[]) => any>(
    callback: T,
    waitFor: number
) => {
    var timeout = null;
    return (...args: Parameters<T>): ReturnType<T> => {
        let result: any;
        clearTimeout(timeout as any as number);
        timeout = setTimeout(() => {
            result = callback(...args);
        }, waitFor) as any;
        return result;
    };
};

const restoreSearchFieldText = (searchField: HTMLInputElement, text: string) => {
    if (text != undefined)
        insertText(searchField, text);

}

const navigateSearch = async (fromSearchField: HTMLInputElement, useAdvancedSearch: boolean) => {


    if (useAdvancedSearch) {
        await load;
        const errorMessages: string[] = []
        try {
            if (sess.lastResponse?.query && sess.lastResponse.query[0]?.condition) {
                sess.parsedQuery = parseQueryResponse(sess.lastResponse.query[0].from[0], sess.lastResponse.query[0].condition as (ConditionAnd | ConditionCompare), errorMessages);
                if (sess.parsedQuery.queryParams) {
                    // also append the type!
                    const from = sess.lastResponse.query[0].from[0];
                    switch (from) {
                        case userSchemaKey:
                            sess.parsedQuery.queryParams.push({
                                key: resultTypeQueryKey,
                                value: 'users'
                            })
                            break;
                        case issueSchemaKey:
                            sess.parsedQuery.queryParams.push({
                                key: resultTypeQueryKey,
                                value: 'issues'
                            })
                            break;
                        case repoSchemaKey:
                            sess.parsedQuery.queryParams.push({
                                key: resultTypeQueryKey,
                                value: 'repositories'
                            })
                            break;
                        case codeSchemaKey:
                            sess.parsedQuery.queryParams.push({
                                key: resultTypeQueryKey,
                                value: 'code'
                            })
                            break;

                        case discussionSchemaKey:
                            sess.parsedQuery.queryParams.push({
                                key: resultTypeQueryKey,
                                value: 'discussions'
                            })
                            break;

                        case topicSchemaKey:
                            sess.parsedQuery.queryParams.push({
                                key: resultTypeQueryKey,
                                value: 'topics'
                            })
                            break;

                        case commitSchemaKey:
                            sess.parsedQuery.queryParams.push({
                                key: resultTypeQueryKey,
                                value: 'commits'
                            })
                            break;
                        default:
                            break;
                    }
                }


            }
            if (sess.lastReadableQuery?.errors && sess.lastReadableQuery?.errors.length > 0) {
                alert('Query contains errors' + JSON.stringify(sess.lastReadableQuery?.errors));
                return;
            }
            if (!sess.parsedQuery?.queryParams || sess.parsedQuery?.queryParams?.length == 0) {
                alert('No advanced search query has been created');
                return;
            }
            else if (sess.parsedQuery) // Only change value if we actually have parsed any query
            {

                navigateToQuery(fromSearchField, sess.parsedQuery);
                return;
            }
        } catch (error) {
           // console.error(error);
            // alert(error.message);   
            throw new Error(error)
        }


    }

    // clean up url and tnavigate
    // reset url
    let newUrl = window.location.href;
    const urlObj = new URL(newUrl);

    if (sess) {
        const urlParams = searchQueryParamsByKey(sess.parsedQuery);
        urlParams.forEach((param, key) => {
            const value = urlObj.searchParams.get(key);
            if (value == param || value == encodeURIComponent(param)) {
                urlObj.searchParams.delete(key);
            }
        });
        newUrl = urlObj.toString();
        while (newUrl.endsWith('&'))
            newUrl = newUrl.substring(0, newUrl.length - 1);
    }

    window.location.href = newUrl;
    return sess.parsedQuery;
}

// The Quantleaf Query API call
const getResults = async (searchField: HTMLInputElement, input: string = '') => {
    await apiKeySetup;
    const suggestOffset = searchField.selectionStart != null ?  Math.max(searchField.selectionStart - 1,0) : input.length;
    const resp = input.length > maxSearchLength ? undefined : await translate(input, schemaObjects, { query: {}, suggest: { limit: 300, offset: suggestOffset } }, { nestedConditions: false, negativeConditions: true, concurrencySize: 1 })
    handleResponse(searchField, input, resp);
}

const calculateSuggestions = () => {
    const suggestionsLimit = 13;
    const suggestObjects = sess.lastResponse?.suggest;
    const limitSuggestions = showAllSuggestions && suggestObjects ? suggestObjects.length : suggestionsLimit
    let suggestions = suggestObjects?.map(s => s.text.trim()).slice(0, Math.min(suggestObjects.length, limitSuggestions)).join(', ');
    if (suggestObjects && suggestObjects?.length > suggestionsLimit) {
        suggestions += ', ...';

    }
    lastSuggestions = suggestions;
}


const noResults = 'No results';
// Injects advanced search UI as the first result element


const handleResponse = (searchField: HTMLInputElement, input: string, responseBody?: QueryResponse) => {

    input as any;

    sess.lastResponse = responseBody;
    sess.parsedQuery = {}

    // Suggestions
    printSuggestions();

    if (input.length > maxSearchLength) {
        resultPrint({
            query: noResults,
            errors: ['Too long search. If you would like to to more advanced searches you can contact us from the "Help" page']
        })
        drawResults(searchField, true);
        return;
    }
    // Query
    else if (!responseBody || ((!responseBody.query || responseBody.query.length == 0) && ((!responseBody.suggest)))) {
        noResultsPrint();
        drawResults(searchField);
        return;
    }

    // Assume unknown serve a purpose
    if (sess.lastResponse && sess.lastResponse.unknown) {
        const unknownAsQuery = parseUnknownQuery(input, sess.lastResponse.unknown);

        // Merge in unknown query if applicable, we only check top level for now
        if (unknownAsQuery && sess.lastResponse && sess.lastResponse.query && sess.lastResponse.query.length == 0) {
            sess.lastResponse.query = [{
                from: [generalSchemaKey],
                condition: unknownAsQuery
            }]

        }
        else if (sess.lastResponse && sess.lastResponse.query && sess.lastResponse.query.length > 0 && unknownAsQuery) {
            if ((sess.lastResponse.query[0].condition as ConditionAnd).and) {
                const and = sess.lastResponse.query[0].condition as ConditionAnd;
                if (!and.and.find((x) => (x as ConditionCompare).compare?.key == allFieldsKey)) {
                    // Add the implicit query
                    and.and.push(unknownAsQuery);
                }

            }
            else if ((sess.lastResponse.query[0].condition as ConditionCompare).compare) {
                const comp = sess.lastResponse.query[0].condition as ConditionCompare;
                if (comp.compare.key != allFieldsKey) {
                    const mergedCondition: ConditionAnd = {
                        and: [
                            comp,
                            unknownAsQuery
                        ]
                    }
                    sess.lastResponse.query[0].condition = mergedCondition;
                }
            }

        }
    }



    // Readable
    sess.lastReadableQuery = sess.lastResponse ? parseReadableQuery(sess.lastResponse) : undefined;
    if (sess.lastReadableQuery)
        resultPrint(sess.lastReadableQuery)
    else
        noResultsPrint();


}
const resultPrint = (readable: ReadableRepresentation) => {
    if (title && readable.from)
        title.innerHTML = readable.from;
    textContainer.innerHTML = `<code style="font-size:14px">${readable.query}</code></br></br>${readable.errors.map((x) => '<span style="color:red">' + x + '</span>').join('</br>')}`;
}


const noResultsPrint = () => {
    textContainer.innerHTML = noResults;
}

var _advancedSearchAutoCompleteContainer: any = null;
const getAdvancedSearchAutoCompleteContainer = (searchField: HTMLInputElement): HTMLElement => {

    if (!_advancedSearchAutoCompleteContainer) {

        _advancedSearchAutoCompleteContainer = document.createElement('div');
        _advancedSearchAutoCompleteContainer.addEventListener("click", (event) => {
            stopEvent(event);
            navigateSearch(lastFocusedSearchField, true);
        });
    }

    const lb = getDefaultAdvancedSearchAutoCompleteContainer(searchField);

    // Make sure it is last in the ist of the parent
    // &&
    // modify style of lb parent so its position is relative to fix som issues on /search

    if (lb?.parentElement) {

        lb.parentElement.style.position = 'relative';
        let index = -1;
        for (let i = 0; i < lb.parentElement.children.length; i++) {
            if (lb.parentElement.children[i] == _advancedSearchAutoCompleteContainer) {
                index = i;
            }

        }
        if (index != lb.parentElement.children.length - 1) {
            if (index != -1) {
                lb.parentElement.removeChild(_advancedSearchAutoCompleteContainer);
            }
        }
        lb?.parentElement?.appendChild(_advancedSearchAutoCompleteContainer);

    }
    return _advancedSearchAutoCompleteContainer;
}



const updateAutoCompleteStyle = () => {

    const def = getDefaultAdvancedSearchAutoCompleteContainer(lastFocusedSearchField);
    const defaultResults = getDefaultResults(lastFocusedSearchField);
    if (def && def instanceof HTMLElement)
        def.style.boxShadow = searchResultBoxShadow;


    const container = getAdvancedSearchAutoCompleteContainer(lastFocusedSearchField);
    let calcStyleHeight: string = '0px';
    let cStyle: any = null;
    if (def) {
        cStyle = window.getComputedStyle(def);
        if (cStyle.display != 'none')
            calcStyleHeight = cStyle.height;
    }
    advancedSearchResultContainer.style.boxShadow = defaultResults?.length > 0 ? searchResultBoxShadow : 'none';
    advancedSearchResultContainer.style.color = textColor;

    if (suggestionViewToggleFocused) {
        suggestionViewToggle.style.backgroundColor = focusedColor;
        suggestionViewToggle.style.color = focusedTextColor;


    }
    else {

        suggestionViewToggle.style.backgroundColor = backgroundColor;
        suggestionViewToggle.style.color = textColor;

    }

    if (advancedSearchResultFocused && !suggestionViewToggleFocused) {
        advancedSearchResultContainer.style.backgroundColor = focusedColor;
        advancedSearchResultContainer.style.color = focusedTextColor;

    }
    else {
        advancedSearchResultContainer.style.backgroundColor = backgroundColor;
        advancedSearchResultContainer.style.color = textColor;

    }
    if (defaultResults?.length > 0 && calcStyleHeight) {
        container.style.top = `calc(100% + ${calcStyleHeight})`;
    }
    else {
        container.style.top = '100%';
    }
    container.style.position = "absolute"





}

const whenFormParent = (element: HTMLElement) => {
    let curr = element;
    while (curr && curr.tagName != 'FORM') {
        if (!curr.parentElement)
            return undefined;
        curr = curr.parentElement;
    }
    return curr;
}
const getDefaultAdvancedSearchAutoCompleteContainer = (searchField: HTMLInputElement): HTMLElement => {

    let el = whenFormParent(searchField)?.querySelector('ul[role="listbox"]')?.parentElement;
    if (!el) {
        el = searchField?.parentElement as HTMLElement;
    };
    return el as HTMLElement;
}

const getDefaultResults = (searchField: HTMLInputElement): HTMLLIElement[] => {
    const el = getDefaultAdvancedSearchAutoCompleteList(searchField);
    if (!el)
        return [];
    const ret: HTMLLIElement[] = []
    const liElements = el.querySelectorAll('li:not(.d-none)');

    for (let i = 0; i < liElements.length; i++) {
        ret.push(liElements[i] as HTMLLIElement);

    }

    return ret;
}

const hasAdvancedResultsToShow = (): boolean => {

    if (!sess.lastReadableQuery || !sess.lastReadableQuery.query )
        return false;
    return true;
}

const getDefaultAdvancedSearchAutoCompleteList = (searchField: HTMLElement): HTMLElement => {
    return whenFormParent(searchField)?.querySelector('ul[role="listbox"]') as HTMLElement
}

const drawResults = (searchField: HTMLInputElement, force?: boolean) => {


    if (!hasAdvancedResultsToShow() && !lastSuggestions && !force) {

        ejectResult(searchField);
        return;
    }

    const listOutlet = getAdvancedSearchAutoCompleteContainer(searchField);
    if (listOutlet) {
        if (listOutlet.firstElementChild == advancedSearchResultContainer)
            listOutlet.removeChild(advancedSearchResultContainer);
        if (listOutlet.lastElementChild != advancedSearchResultContainer)
            listOutlet.appendChild(advancedSearchResultContainer);

        listOutlet.style.width = '100%'; // Fixes some visual issues

    }
}
const unfocusAdvancedSearchField = () => {
    advancedSearchResultFocused = false;
    suggestionViewToggleFocused = false;
}
const ejectResult = (searchField: HTMLInputElement) => {

    const listOutlet = getAdvancedSearchAutoCompleteContainer(searchField);
    unfocusAdvancedSearchField();

    if (listOutlet) {
        if (listOutlet.firstElementChild == advancedSearchResultContainer)
            listOutlet.removeChild(advancedSearchResultContainer);
    }

}
const insertText = (searchField: HTMLInputElement, text?: string) => {
    /*if (lastSearchField) {
        (lastSearchField as HTMLInputElement).focus();
        if (clear)
            lastSearchField.value = '';
        document.execCommand('insertText', false, text);
        lastSearchField.dispatchEvent(new Event('change', { bubbles: true })); // usually not needed
    }*/

    if (searchField) {
        if (text != undefined)
            searchField.value = text;

    }

}
/*
const searchFieldTextFromParsedQuery = (parsedQuery?: ParsedQuery) => {
    if (!parsedQuery)
        return undefined;
    return  parsedQuery.searchParams ? 'p='+parsedQuery.searchParams : '';
}*/

const searchQueryParamsByKey = (parsedQuery?: ParsedQuery): Map<string, string> => {
    const currentQueryParams = new Map<string, string>();
    /*  const currentUrl = new URL(window.location.href);
      if(parsedQuery?.queryParams && !parsedQuery?.queryParams[resultTypeQueryKey]) // if type is determined by query, dont preserve any parameters
      {
          currentUrl.searchParams.forEach((v,k)=> // preserve some params (from user UI input)
          {
              if(k != resultTypeQueryKey)  // Only preserve prior result type query params
                  return; 
              currentQueryParams.set(k,v);
          }); 
      }*/

    if (!parsedQuery?.queryParams)
        return currentQueryParams;
    const groups = new Map<string, string[]>();
    parsedQuery?.queryParams.forEach((q) => {
        let arr = groups.get(q.key);
        if (!arr) {
            arr = [];
            groups.set(q.key, arr);
        }
        arr.push(q.value);
    });
    const groupsJoined = currentQueryParams;
    groups.forEach((v, k) => {
        groupsJoined.set(k, v.join(' '));
    })
    return groupsJoined;
}


const searchQueryParamsFromParsedQuery = (parsedQuery?: ParsedQuery) => {
    const groups = searchQueryParamsByKey(parsedQuery);
    const urlParams: string[] = [];
    groups.forEach((v, k) => {
        urlParams.push(`${k}=${encodeURIComponent(v)}`);
    })
    const par = urlParams.join('&');
    return par;
}

const buildUrlFromQuery = (searchField: HTMLInputElement, parsedQuery: ParsedQuery) => `https://${window.location.hostname}${urlSearchPath}?${searchQueryParamsFromParsedQuery(parsedQuery)}&${redirectFromQueryKey}=${encodeURIComponent(searchField?.value)}`
const navigateToQuery = (searchField: HTMLInputElement, parsedQuery: ParsedQuery) => {
    window.location.href = buildUrlFromQuery(searchField, parsedQuery);

}



const printSuggestions = () => {

    calculateSuggestions();
    suggestionViewToggle.innerHTML = showAllSuggestions ? hideAllSuggetsionsHTML : showAllSuggestionsHTML;

    if (lastSuggestions) {
        suggestionsContainer.innerHTML = `Suggestions</br><i>${lastSuggestions}</i>`;
        /*
         try {
             suggestionsWrapper.removeChild(suggestionViewToggle)
             
         } catch (error) {
             
         }
         if(limitedSuggestions)
                 suggestionsWrapper.appendChild(suggestionViewToggle)*/

    }
    else {
        /*  try {
              suggestionsWrapper.removeChild(suggestionViewToggle)
  
          } catch (error) {
              
          }*/
        suggestionsContainer.innerHTML = `<i>No suggestions available</i>`;

    }
}

const eliminateDoubleNot = (condition: (ConditionAnd | ConditionNot | ConditionCompare)) => {
    // We do not want 'NOT a != b', but in this case, a = b
    if ((condition as ConditionAnd).and) {
        (condition as ConditionAnd).and.forEach((a) => {
            eliminateDoubleNot(a as (ConditionAnd | ConditionNot | ConditionCompare));
        })
    }
    else if ((condition as ConditionNot).not) {
        const not = (condition as ConditionNot);
        const comp = (not.not as ConditionCompare);

        if (comp.compare.neq) {
            comp.compare.eq = comp.compare.neq;
            delete comp.compare.neq;
            delete condition['not'];
            Object.assign(condition, comp);

        }
    }
}

// Readable representation of the query object
const parseReadableQuery = (response: QueryResponse): ReadableRepresentation | undefined => {
    let condition: ConditionElement = null as any;
    let from: string = '';
    let schemaKey: string = '';
    if (response?.query && response.query.length > 0) {
        condition = response.query[0].condition;
        const froms = response.query[0].from;
        // Assume only one schema per query
        schemaKey = froms[0];
        from = firstDescription(generatedSchemas.find(x => x.name.key == schemaKey)?.name.description);
    }

    if (!condition) {
        return undefined;
    }
    const status: QueryStatus = {
        faults: []
    }
    eliminateDoubleNot(condition as (ConditionAnd | ConditionNot | ConditionCompare));
    let ordinaryReadableQuery = parseReadableOrdinaryQuery(schemaKey, status, condition as (ConditionAnd | ConditionNot | ConditionCompare));
    if (ordinaryReadableQuery && ordinaryReadableQuery.startsWith('(') && ordinaryReadableQuery.endsWith(')'))
        ordinaryReadableQuery = ordinaryReadableQuery.substring(1, ordinaryReadableQuery.length - 1);
    const ret: string[] = [];
    if (ordinaryReadableQuery) {
        ret.push(ordinaryReadableQuery);


    }
    return {
        from: from,
        query: ret.join('\n'),
        errors: status.faults
    };
}


const parseUnknownQuery = (input: string, unknown?: Unknown[]): ConditionCompare | undefined => {
    if (!unknown)
        return undefined;
    let startUnknown: ConditionCompare | undefined = undefined;
    let endUnkown: ConditionCompare | undefined = undefined;

    for (let i = 0; i < unknown.length; i++) {
        const u = unknown[i];
        if (u.offset == 0 && u.length > 2) {
            let value = input.substring(u.offset, u.offset + u.length);

            // Starts with unknown?
            if (value.startsWith("\"") && value.endsWith("\"")) {
                value = value.substring(1, value.length - 1);
            }
            startUnknown = {
                compare:
                {
                    key: allFieldsKey,
                    eq: value
                }
            }

        }
        // ends with unnknown?
        if (u.offset > 0 && u.offset + u.length == input.length) {
            let value = input.substring(u.offset, u.offset + u.length);
            if (value.startsWith("\"") && value.endsWith("\"")) {
                value = value.substring(1, value.length - 1);
            }
            endUnkown = {
                compare:
                {
                    key: allFieldsKey,
                    eq: value
                }
            }
        }
        if (startUnknown && endUnkown)
            break;
    }
    let unknownToUse = startUnknown;
    if (endUnkown?.compare?.eq) {
        if (!unknownToUse || !unknownToUse.compare.eq)
            unknownToUse = endUnkown;
        else //combine
        {
            // use end unknown if longer
            unknownToUse.compare.eq = String(unknownToUse?.compare.eq) + ' ' + String(endUnkown?.compare.eq)
        }
    }
    return unknownToUse;
}


const indent = (text: string, depth: number = 0) => {
    const textLines = text.split("</br>");
    const builder: string[] = [];
    for (let i = 0; i < depth; i++) {
        builder.push('&ensp;&ensp;&ensp;&ensp;')
    }
    const pad = builder.join('');
    return textLines.map(x => pad + x).join('</br>');
}

const strong = (text: string) => '<strong>' + text + '</strong>'
const pad = (text: string) => ' ' + text + ' '
//const italic = (text:string) => '<i>' + text+ '</i>'
const wrapJoin = (arr: string[], delimiter: string) => delimiter.length == 0 ? arr.join('</br>') : arr.join('</br>' + delimiter + '</br>')

const conditionsReadable = (schemaKey: string, status: QueryStatus, condition: (ConditionAnd), depth) => {
    let delimiter = '';
    let arr = ((condition as ConditionAnd).and);
    if (!arr)
        return null;

    const join: string[] = [];
    arr.forEach((element) => {
        const compare = parseReadableOrdinaryQuery(schemaKey, status, element as (ConditionAnd | ConditionCompare), 1);
        if (compare)
            join.push(compare);
    });
    return indent(join.length > 1 ? `${wrapJoin(join, delimiter)}` : join[0], depth);
}

const parseReadableOrdinaryQuery = (schemaKey: string, status: QueryStatus, condition: (ConditionAnd | ConditionCompare | ConditionNot), depth = 0): string => {

    if (!condition)
        return '';
    const fromAnd = conditionsReadable(schemaKey, status, condition as (ConditionAnd), depth);
    if (fromAnd)
        return fromAnd;


    if ((condition as ConditionCompare).compare) {
        const compElements: string[] = [];
        const comp = (condition as ConditionCompare).compare;
        compElements.push(firstDescription(fieldsByKey.get(schemaKey)?.get(comp.key)?.description));
        if (comp.eq != undefined) {
            compElements.push(pad(strong('=')) + formatValue(schemaKey, comp.key, comp.eq, false));
        }
        else if (comp.gt != undefined) {
            compElements.push(pad(strong('>')) + formatValue(schemaKey, comp.key, comp.gt, false));
        }
        else if (comp.gte != undefined) {
            compElements.push(pad(strong('≥')) + formatValue(schemaKey, comp.key, comp.gte, false));
        }
        else if (comp.lt != undefined) {
            compElements.push(pad(strong('<')) + formatValue(schemaKey, comp.key, comp.lt, false));
        }
        else if (comp.lte != undefined) {
            compElements.push(pad(strong('≤')) + formatValue(schemaKey, comp.key, comp.lte, false));
        }
        else if (comp.neq != undefined) {
            compElements.push(pad(strong('≠')) + formatValue(schemaKey, comp.key, comp.neq, false));
        }

        const conditionReadable = compElements.join('');
        return conditionReadable;
    }
    else if ((condition as ConditionNot).not) {
        return strong('NOT') + ' ' + parseReadableOrdinaryQuery(schemaKey, status, (condition as ConditionNot).not as (ConditionAnd | ConditionCompare))
    }
    return '';
}

const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

const mergeDeep = (target, source) => {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

const domainIsGroupable = (domain: any) => {
    return domain == StandardDomain.NUMBER || domain == StandardDomain.DATE
}

const parseGroupNumberConditions = (schemaKey: string, condition: (ConditionAnd | ConditionCompare | ConditionNot)) => {
    if ((condition as ConditionCompare).compare || (condition as ConditionNot).not)
        return condition;

    const groupMap: Map<string, ConditionCompare[]> = new Map();
    const newAnd: ConditionCompare[] = [];
    const and = (condition as ConditionAnd).and;
    and?.forEach((a) => {
        const cc = a as ConditionCompare;
        const comp = cc.compare;
        if (fieldsByKey.has(comp.key) && domainIsGroupable(fieldsByKey.get(schemaKey)?.get(comp.key)?.domain)) {
            let arr = groupMap.get(comp.key);
            if (!arr) {
                arr = [];
                groupMap.set(comp.key, arr);
            }
            arr.push(cc);
        }
        else {
            newAnd.push(cc);
        }
    });
    groupMap.forEach((group) => {
        let merge = group[0];
        for (let i = 1; i < group.length; i++) {
            merge = mergeDeep(merge, group[i])

        }
        newAnd.push(merge);
    });
    (condition as ConditionAnd).and = newAnd;
    return condition;

}
const parseQueryResponse = (schemaKey: string, condition: (ConditionAnd | ConditionCompare | ConditionNot), errorMessages: string[]): ParsedQuery => {
    if (!condition)
        return {};

    const ordinaryConditions = parseOrdinaryConditions(schemaKey, parseGroupNumberConditions(schemaKey, condition), errorMessages);

    return ordinaryConditions;
}


const comparatorSymbolNonText = (comp: Compare) => {
    if (comp.gt != undefined) {
        return '>'
    }
    if (comp.gte != undefined) {
        return '>='
    }
    if (comp.lt != undefined) {
        return '<'
    }
    if (comp.lte != undefined) {
        return '<='
    }
    return '';
}

const compareValue = (comp: Compare) => {
    if (comp.eq != undefined)
        return comp.eq
    if (comp.gt != undefined)
        return comp.gt

    if (comp.gte != undefined) {
        return comp.gte
    }
    else if (comp.lt != undefined) {
        return comp.lt
    }
    else if (comp.lte != undefined) {
        return comp.lte
    }
    else if (comp.neq != undefined) {
        return comp.neq
    }
    return undefined;
}

const parseOrdinaryConditions = (schemaKey: string, condition: (ConditionAnd | ConditionCompare | ConditionNot), errorMessages: string[]): ParsedQuery => {
    if (!condition)
        return {};
    if ((condition as ConditionAnd).and) {
        const queryParams: QueryParam[] = [];
        (condition as ConditionAnd).and.forEach((element) => {
            const parseResult = parseQueryResponse(schemaKey, element as (ConditionAnd | ConditionCompare), errorMessages);
            if (parseResult.queryParams)
                queryParams.push(...parseResult.queryParams)
        });
        return {
            queryParams: queryParams
        };
    }
    else if ((condition as ConditionNot).not) {
        const nested = parseOrdinaryConditions(schemaKey, ((condition as ConditionNot).not) as ConditionCompare, errorMessages);
        nested.queryParams?.forEach((param) => {
            param.value = '-' + param.value;
        });
        return nested;
    }
    else if ((condition as ConditionCompare).compare) {
        const comp = (condition as ConditionCompare).compare;
        {
            if (Object.keys(comp).length == 2) {
                const isTextKey = comp.key == allFieldsKey || comp.key == allFieldsExactMatchKey;
                return {

                    queryParams: [
                        {
                            key: querQueryKey,
                            value: (comp.neq != undefined ? (isTextKey ? 'NOT ' : '-') : '') + (isTextKey ? '' : String(comp.key) + ':') + comparatorSymbolNonText(comp) + formatValue(schemaKey, comp.key, compareValue(comp), !isTextKey)
                        }
                    ]
                }
            }
            else // Number and dates has been merged
            {
                let from = '*';
                let to = '*';

                if (comp.lte != undefined)
                    to = formatValue(schemaKey, comp.key, comp.lte);
                if (comp.lt != undefined)
                    to = formatValue(schemaKey, comp.key, comp.lt);
                if (comp.gte != undefined)
                    from = formatValue(schemaKey, comp.key, comp.gte);
                if (comp.gt != undefined)
                    from = formatValue(schemaKey, comp.key, comp.gt);
                if (comp.eq != undefined) {
                    // comp eq outside range, well just ignore it?
                }

                return {

                    queryParams: [
                        {
                            key: 'q',
                            value: `${comp.key}:${from}..${to}`
                        }
                    ]
                }

            }
        }
    }
    return {};

}



/*
const wordSplit = (words) => {
    if (!words)
        return [];
    return words.replace(/,\s+/g, ",").split(/[\n,\s+]/)
}*/

const formatDate = (ms) => {
    const date = new Date(ms);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;

}
const escape = (text: string) => '"' + text + '"'

const formatValue = (schemaKey: string, key: string, value: any, asQueryValue = true) => {
    const field = fieldsByKey.get(schemaKey)?.get(key) as Field;
    if (!field || !field.domain)
        throw new Error('Field missing');
    let ret = '';

    if (field.domain == 'DATE') {
        ret = formatDate(value);
        return ret;

    }
    else if (typeof field.domain != 'string' && field.domain[value]) // Enum domain!
    {
        let desc = firstDescription(field.domain[value]);
        if (desc && !asQueryValue)
            ret = desc;
        else
            ret = value;
    }
    else {
        ret = value;
        if (userNameFields.has(key) && ret == 'me')
            ret = '@me';
    }

    if (asQueryValue && (key == allFieldsExactMatchKey || /\s/g.test(ret as string))) {
        ret = escape(ret);
    }
    return ret;
}
const firstDescription = (desc) => {
    if (Array.isArray(desc))
        return desc[0];
    if (desc['ANY'])
        return firstDescription(desc['ANY']);
    for (const key of Object.keys(desc)) {
        const d = firstDescription(desc[key]);
        if (d)
            return d;
    }
    return '';
}
const stopEvent = (event) => {
    event.cancelBubble = true;
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
}

const findSearchFields = (): HTMLInputElement[] => {
    const s1 = document.querySelector('header form[role="search"] input[type="text"][spellcheck="false"][autocomplete="off"]') as HTMLInputElement;
    const s2 = document.querySelector('main form[action="/search"] input[type="text"][spellcheck="false"][autocomplete="off"]') as HTMLInputElement;
    const s3 = document.querySelector('main form[action="/search"] input[type="text"][spellcheck="false"][autocomplete="off"]') as HTMLInputElement;
    const s: HTMLInputElement[] = [];

    if (s1)
        s.push(s1);
    if (s2)
        s.push(s2);
    if (s3 && !s2)
        s.push(s3);
        
    return s;
}

const getAndDrawResultWithLoader = async (searchField:HTMLInputElement) =>
{
    const newValue = searchField?.value;
    const newSelectionStart = searchField.selectionStart;
    await load;
    if (newValue != searchField?.value || (newValue == lastSearch && newSelectionStart == lastSelectionStart))
    {
        
        unfocusAdvancedSearchField
        drawResults(searchField);
        updateAutoCompleteStyle();
        return;
    }
        
    lastSelectionStart = newSelectionStart as number;
    lastSearch = newValue;
    unfocusAdvancedSearchField();
    updateAutoCompleteStyle();
    sess.lastReadableQuery = undefined;
    sess.lastResponse = undefined;
    sess.parsedQuery = undefined;

    loading();
    load = new Promise((resolve) => {
        debounce(() => {
            getResults(searchField, searchField?.value).then(() => {
                // Hide or show
                drawResults(searchField);
                updateAutoCompleteStyle();
                resolve(true);
            }).catch(() => {
                resolve(true);
            });
        }, debounceTime + 1)();
    });
    await load;
    unloading();
    
    
}
const searchFieldFocusEvent = (searchField) =>
{
    if(lastFocusedSearchField != searchField)
                    hasTypedAnything = false;
    lastFocusedSearchField = searchField;
    restoreLastSearchQuery(searchField);
    observer.disconnect();
    if (getDefaultAdvancedSearchAutoCompleteList(searchField))
        observer.observe(getDefaultAdvancedSearchAutoCompleteList(searchField), {
            subtree: true,
            attributes: true,
            childList: true
        });

    setTimeout(() => {
        getAndDrawResultWithLoader(searchField);
    }, 0);
}
// Add listeners for the search field, and set colors for styling (depending on color mode, light, dim, dark)
const initialize = async () => {
    var inserted = false;
    let maxTriesFind = 50;
    let findCounter = 0;
    hasTypedAnything = false;
    restoredSearchFields = new Set();
    await apiKeySetup;
    if (serviceError) {
        return; // Do initialize UI
    }
    while (!inserted) {
        searchFields = findSearchFields();

        findCounter++;

        if (findCounter > maxTriesFind)
            break;

        if (searchFields.length > 0) {
            inserted = true;
        }

        else {
            await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 sec
            continue;
        }

        if (searchFields?.length > 0) {
            getResults(searchFields[0], searchFields[0]?.value);
        }

        /* lastSearchField.addEventListener("keypress", () => {
             if(sess?.parsedQuery)
             {
                
             }
         }
         );*/
        //.filter(f=>!f.getAttribute(eventListenerTag))
        searchFields.forEach((searchField) => {
            searchField.setAttribute(eventListenerTag, 'true');
            searchField.addEventListener("keydown", async (event) => {
                const arrowUp = event.key == 'ArrowUp';
                const arrowDown = event.key == 'ArrowDown';
                if (arrowUp || arrowDown) {
                    // key down
                    const defaultResults = getDefaultResults(searchField);
                    const lastFocused = lastSelectedAutoCompleteOption == defaultResults.length - 1;
                    if (lastFocused && arrowDown) {
                        advancedSearchResultFocused = true;
                        unfocusDefaultAutoCompleteOptions();
                        stopEvent(event);
                        return;

                    }
                    else {
                        if (advancedSearchResultFocused) {
                            focusLastDefaultAutoCompleteOption();
                            stopEvent(event);

                        }
                        advancedSearchResultFocused = false;


                    }

                }
            })

            searchField.addEventListener("keyup", async (event) => {
                hasTypedAnything = true;
                const arrowUp = event.key == 'ArrowUp';
                const arrowDown = event.key == 'ArrowDown';
                lastFocusedSearchField = searchField;
                if (arrowUp || arrowDown) {
                    const defaultResults = getDefaultResults(searchField);
                    if (defaultResults) {
                        for (let i = 0; i < defaultResults.length; i++) {
                            if (defaultResults[i].getAttribute('aria-selected') == 'true') {
                                lastSelectedAutoCompleteOption = i;
                                break;

                            }

                        }
                    }
                    drawResults(searchField);
                    updateAutoCompleteStyle();
                }

                if (arrowDown && advancedSearchResultFocused) {
                    stopEvent(event);
                    return;
                }
            },
                {
                    capture: true
                });

            searchField.addEventListener("keyup", async (event) => {
                if (event.key == 'ArrowDown' || event.key == 'ArrowUp')
                    return;
                
                await getAndDrawResultWithLoader(searchField);
            },
                {
                    capture: true
                });
            searchField.addEventListener("click", () => {
                if(lastFocusedSearchField != searchField)
                {
                    lastFocusedSearchField = searchField;
                    searchFieldFocusEvent(searchField);
                }
            })
            searchField.addEventListener("focus", () => {

                searchFieldFocusEvent(searchField);
            })
        });
    }
}
const isInitialized = (): boolean => {
    if (searchFields.length == 0)
        return false;

    const newSearchFields = findSearchFields();
    if (newSearchFields.length != searchFields.length)
        return false;
    for (let i = 0; i < newSearchFields.length; i++) {
        if (newSearchFields[i] != searchFields[i])
            return false;

    }
    return true;
}

document.body.addEventListener("keydown", event => {
    if (event.keyCode === 17) {
        ctrlDown = true;
        return;
    }

});
document.body.addEventListener("keyup", event => {
    if (event.keyCode === 17) {
        ctrlDown = false;
    }
    if (event.keyCode === 32) {
        // Space clicked, toggle suggestions
        if (ctrlDown) {
            showAllSuggestions = !showAllSuggestions;
            printSuggestions();
        }
        return;
    }
});
document.addEventListener("keydown", event => {



    if (event.keyCode === 13 && advancedSearchResultFocused) {
        stopEvent(event);
        navigateSearch(lastFocusedSearchField, true);
        return;
    }
});

window.addEventListener('click', (e) => {
    if (e.target)
        if (advancedSearchResultContainer.contains(e.target as Node) || lastFocusedSearchField?.contains(e.target as Node)) {

        }
        else if (lastFocusedSearchField) {
            ejectResult(lastFocusedSearchField);
        }
});

window.onblur = function() {
    ejectResult(lastFocusedSearchField);
};


MutationObserver = window.MutationObserver
var observer = new MutationObserver(function () {

    updateAutoCompleteStyle();
});

preRestoreFormUrl();
const checkInitialize = async () => {
    if (!isInitialized())
        await initialize();
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 500);
    });
    checkInitialize();
}
checkInitialize();
