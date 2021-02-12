import { StandardDomain } from '@quantleaf/query-schema';
import { ClassInfo, FieldInfo } from '@quantleaf/query-sdk-node'; //, translate, config

export const allFieldsKey = 'allFields';


export class AdvancedSearch {
    @FieldInfo({
        key: 'user',
        description: ["owner", "owners", "from","user"],
        domain: StandardDomain.TEXT
    })
    owner: string;

    @FieldInfo({
        key: 'repo',
        description: ["repositories", "repos","repo"],
        domain: StandardDomain.TEXT
    })
    repository: string;

    @FieldInfo({
        key: 'created',
        description: ["creation date", "created"],
        domain: StandardDomain.DATE
    })
    date: Date;

    @FieldInfo({
        key: 'language',
        description: ["language","user language","repo language"],
        domain: ['C', 'C#', 'C++', 'CoffeeScript', 'CSS', 'Dart', 'DM', 'Elixir', 'Go', 'Groovy', 'HTML', 'Java', 'JavaScript', 'Kotlin', 'Objective-C', 'Perl', 'PHP', 'PowerShell', 'Python', 'Ruby', 'Rust', 'Scala', 'Shell', 'Swift', 'TypeScript', '4D', 'ABAP', 'ABNF', 'ActionScript', 'Ada', 'Adobe Font Metrics', 'Agda', 'AGS Script', 'AL', 'Alloy', 'Alpine Abuild', 'Altium Designer', 'AMPL', 'AngelScript', 'Ant Build System', 'ANTLR', 'ApacheConf', 'Apex', 'API Blueprint', 'APL', 'Apollo Guidance Computer', 'AppleScript', 'Arc', 'AsciiDoc', 'ASL', 'ASN.1', 'ASP.NET', 'AspectJ', 'Assembly', 'Asymptote', 'ATS', 'Augeas', 'AutoHotkey', 'AutoIt', 'Avro IDL', 'Awk', 'Ballerina', 'Batchfile', 'Befunge', 'BibTeX', 'Bison', 'BitBake', 'Blade', 'BlitzBasic', 'BlitzMax', 'Bluespec', 'Boo', 'Brainfuck', 'Brightscript', 'Browserslist', 'C-ObjDump', 'C2hs Haskell', 'Cabal Config', "Cap'n Proto", 'CartoCSS', 'Ceylon', 'Chapel', 'Charity', 'ChucK', 'Cirru', 'Clarion', 'Classic ASP', 'Clean', 'Click', 'CLIPS', 'Clojure', 'Closure Templates', 'Cloud Firestore Security Rules', 'CMake', 'COBOL', 'CodeQL', 'ColdFusion', 'ColdFusion CFC', 'COLLADA', 'Common Lisp', 'Common Workflow Language', 'Component Pascal', 'CoNLL-U', 'Cool', 'Coq', 'Cpp-ObjDump', 'Creole', 'Crystal', 'CSON', 'Csound', 'Csound Document', 'Csound Score', 'CSV', 'Cuda', 'cURL Config', 'CWeb', 'Cycript', 'Cython', 'D', 'D-ObjDump', 'Dafny', 'Darcs Patch', 'DataWeave', 'desktop', 'Dhall', 'Diff', 'DIGITAL Command Language', 'dircolors', 'DirectX 3D File', 'DNS Zone', 'Dockerfile', 'Dogescript', 'DTrace', 'Dylan', 'E', 'Eagle', 'Easybuild', 'EBNF', 'eC', 'Ecere Projects', 'ECL', 'ECLiPSe', 'EditorConfig', 'Edje Data Collection', 'edn', 'Eiffel', 'EJS', 'Elm', 'Emacs Lisp', 'EmberScript', 'EML', 'EQ', 'Erlang', 'F#', 'F*', 'Factor', 'Fancy', 'Fantom', 'Faust', 'FIGlet Font', 'Filebench WML', 'Filterscript', 'fish', 'FLUX', 'Formatted', 'Forth', 'Fortran', 'Fortran Free Form', 'FreeMarker', 'Frege', 'Futhark', 'G-code', 'Game Maker Language', 'GAML', 'GAMS', 'GAP', 'GCC Machine Description', 'GDB', 'GDScript', 'GEDCOM', 'Genie', 'Genshi', 'Gentoo Ebuild', 'Gentoo Eclass', 'Gerber Image', 'Gettext Catalog', 'Gherkin', 'Git Attributes', 'Git Config', 'GLSL', 'Glyph', 'Glyph Bitmap Distribution Format', 'GN', 'Gnuplot', 'Golo', 'Gosu', 'Grace', 'Gradle', 'Grammatical Framework', 'Graph Modeling Language', 'GraphQL', 'Graphviz (DOT)', 'Groovy Server Pages', 'Hack', 'Haml', 'Handlebars', 'HAProxy', 'Harbour', 'Haskell', 'Haxe', 'HCL', 'HiveQL', 'HLSL', 'HolyC', 'HTML+Django', 'HTML+ECR', 'HTML+EEX', 'HTML+ERB', 'HTML+PHP', 'HTML+Razor', 'HTTP', 'HXML', 'Hy', 'HyPhy', 'IDL', 'Idris', 'Ignore List', 'IGOR Pro', 'Inform 7', 'INI', 'Inno Setup', 'Io', 'Ioke', 'IRC log', 'Isabelle', 'Isabelle ROOT', 'J', 'Jasmin', 'Java Properties', 'Java Server Pages', 'JavaScript+ERB', 'JFlex', 'Jison', 'Jison Lex', 'Jolie', 'JSON', 'JSON with Comments', 'JSON5', 'JSONiq', 'JSONLD', 'Jsonnet', 'JSX', 'Julia', 'Jupyter Notebook', 'Kaitai Struct', 'KiCad Layout', 'KiCad Legacy Layout', 'KiCad Schematic', 'Kit', 'KRL', 'LabVIEW', 'Lark', 'Lasso', 'Latte', 'Lean', 'Less', 'Lex', 'LFE', 'LilyPond', 'Limbo', 'Linker Script', 'Linux Kernel Module', 'Liquid', 'Literate Agda', 'Literate CoffeeScript', 'Literate Haskell', 'LiveScript', 'LLVM', 'Logos', 'Logtalk', 'LOLCODE', 'LookML', 'LoomScript', 'LSL', 'LTspice Symbol', 'Lua', 'M', 'M4', 'M4Sugar', 'Macaulay2', 'Makefile', 'Mako', 'Markdown', 'Marko', 'Mask', 'Mathematica', 'MATLAB', 'Maven POM', 'Max', 'MAXScript', 'mcfunction', 'MediaWiki', 'Mercury', 'Meson', 'Metal', 'Microsoft Developer Studio Project', 'MiniD', 'Mirah', 'mIRC Script', 'MLIR', 'Modelica', 'Modula-2', 'Modula-3', 'Module Management System', 'Monkey', 'Moocode', 'MoonScript', 'Motorola 68K Assembly', 'MQL4', 'MQL5', 'MTML', 'MUF', 'mupad', 'Muse', 'Mustache', 'Myghty', 'nanorc', 'NASL', 'NCL', 'Nearley', 'Nemerle', 'NEON', 'nesC', 'NetLinx', 'NetLinx+ERB', 'NetLogo', 'NewLisp', 'Nextflow', 'Nginx', 'Nim', 'Ninja', 'Nit', 'Nix', 'NL', 'NPM Config', 'NSIS', 'Nu', 'NumPy', 'NWScript', 'ObjDump', 'Object Data Instance Notation', 'Objective-C++', 'Objective-J', 'ObjectScript', 'OCaml', 'Odin', 'Omgrofl', 'ooc', 'Opa', 'Opal', 'Open Policy Agent', 'OpenCL', 'OpenEdge ABL', 'OpenQASM', 'OpenRC runscript', 'OpenSCAD', 'OpenStep Property List', 'OpenType Feature File', 'Org', 'Ox', 'Oxygene', 'Oz', 'P4', 'Pan', 'Papyrus', 'Parrot', 'Parrot Assembly', 'Parrot Internal Representation', 'Pascal', 'Pawn', 'Pep8', 'Pic', 'Pickle', 'PicoLisp', 'PigLatin', 'Pike', 'PlantUML', 'PLpgSQL', 'PLSQL', 'Pod', 'Pod 6', 'PogoScript', 'Pony', 'PostCSS', 'PostScript', 'POV-Ray SDL', 'PowerBuilder', 'Prisma', 'Processing', 'Proguard', 'Prolog', 'Propeller Spin', 'Protocol Buffer', 'Public Key', 'Pug', 'Puppet', 'Pure Data', 'PureBasic', 'PureScript', 'Python console', 'Python traceback', 'q', 'Q#', 'QMake', 'QML', 'Qt Script', 'Quake', 'R', 'Racket', 'Ragel', 'Raku', 'RAML', 'Rascal', 'Raw token data', 'RDoc', 'Readline Config', 'REALbasic', 'Reason', 'Rebol', 'Red', 'Redcode', 'Regular Expression', "Ren'Py", 'RenderScript', 'ReScript', 'reStructuredText', 'REXX', 'Rich Text Format', 'Ring', 'Riot', 'RMarkdown', 'RobotFramework', 'Roff', 'Roff Manpage', 'Rouge', 'RPC', 'RPM Spec', 'RUNOFF', 'Sage', 'SaltStack', 'SAS', 'Sass', 'Scaml', 'Scheme', 'Scilab', 'SCSS', 'sed', 'Self', 'ShaderLab', 'ShellSession', 'Shen', 'Sieve', 'Slash', 'Slice', 'Slim', 'Smali', 'Smalltalk', 'Smarty', 'SmPL', 'SMT', 'Solidity', 'SourcePawn', 'SPARQL', 'Spline Font Database', 'SQF', 'SQL', 'SQLPL', 'Squirrel', 'SRecode Template', 'SSH Config', 'Stan', 'Standard ML', 'Starlark', 'Stata', 'STON', 'Stylus', 'SubRip Text', 'SugarSS', 'SuperCollider', 'Svelte', 'SVG', 'SWIG', 'SystemVerilog', 'Tcl', 'Tcsh', 'Tea', 'Terra', 'TeX', 'Texinfo', 'Text', 'Textile', 'Thrift', 'TI Program', 'TLA', 'TOML', 'TSQL', 'TSV', 'TSX', 'Turing', 'Turtle', 'Twig', 'TXL', 'Type Language', 'Unified Parallel C', 'Unity3D Asset', 'Unix Assembly', 'Uno', 'UnrealScript', 'UrWeb', 'V', 'Vala', 'VBA', 'VBScript', 'VCL', 'Verilog', 'VHDL', 'Vim Help File', 'Vim script', 'Vim Snippet', 'Visual Basic .NET', 'Volt', 'Vue', 'Wavefront Material', 'Wavefront Object', 'wdl', 'Web Ontology Language', 'WebAssembly', 'WebIDL', 'WebVTT', 'Wget Config', 'Windows Registry Entries', 'wisp', 'Wollok', 'World of Warcraft Addon Data', 'X BitMap', 'X Font Directory Index', 'X PixMap', 'X10', 'xBase', 'XC', 'XCompose', 'XML', 'XML Property List', 'Xojo', 'XPages', 'XProc', 'XQuery', 'XS', 'XSLT', 'Xtend', 'Yacc', 'YAML', 'YANG', 'YARA', 'YASnippet', 'ZAP', 'Zeek', 'ZenScript', 'Zephir', 'Zig', 'ZIL', 'Zimpl']
    })
    language: string;

    @FieldInfo({
        key: allFieldsKey,
        description: ["content", "contains", "containing", "about", "all of"],
        domain: StandardDomain.TEXT
    })
    allFields: string;

}

@ClassInfo({
    key: 'repository-search',
    description: 'Repository search'
})
export class RepositorySearch  extends AdvancedSearch {
    
    @FieldInfo({
        key: 'stars',
        description: ['stars','likes'],
        domain:StandardDomain.NUMBER
    })
    stars: number;

    @FieldInfo({
        key: 'size',
        description: ['size kb','size', 'file size'],
        domain:StandardDomain.NUMBER
    })
    sizeKb: number;

    @FieldInfo({
        key: 'pushed',
        description: ['pushed date','pushed to' ,'pushed','change date','change'],
        domain:StandardDomain.DATE
    })
    pushedDate: Date;

    @FieldInfo({
        key: 'license',
        description: 'license',
        domain: ['BSD Zero Clause License', 'Academic Free License v3.0', 'GNU Affero General Public License v3.0', 'Apache License 2.0', 'Artistic License 2.0', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'BSD 3-Clause Clear License', 'BSD 4-Clause "Original" or "Old" License', 'Boost Software License 1.0', 'Creative Commons Attribution 4.0 International', 'Creative Commons Attribution Share Alike 4.0 International', 'Creative Commons Zero v1.0 Universal', 'CeCILL Free Software License Agreement v2.1', 'Educational Community License v2.0', 'Eclipse Public License 1.0', 'Eclipse Public License 2.0', 'European Union Public License 1.1', 'European Union Public License 1.2', 'GNU General Public License v2.0', 'GNU General Public License v3.0', 'ISC License', 'GNU Lesser General Public License v2.1', 'GNU Lesser General Public License v3.0', 'LaTeX Project Public License v1.3c', 'MIT License', 'Mozilla Public License 2.0', 'Microsoft Public License', 'Microsoft Reciprocal License', 'University of Illinois/NCSA Open Source License', 'ODC Open Database License v1.0', 'SIL Open Font License 1.1', 'Open Software License 3.0', 'PostgreSQL License', 'The Unlicense', 'Universal Permissive License v1.0', 'Vim License', 'Do What The F*ck You Want To Public License', 'zlib License', 'Creative Commons', 'GNU General Public License', 'GNU Lesser General Public License']
    })
    license: string;


    @FieldInfo({
        key: 'fork',
        description: 'fork filter',
        domain: {
            'only' : 'only forks',
            'and' : 'include forks'

        }
    })
    forkOption: string;
}
@ClassInfo({
    key: 'file-search',
    description: 'File search'
})

export class FileSearch  extends AdvancedSearch {
    @FieldInfo({
        key: 'extension',
        description: ['file extension','extension'],
        domain: StandardDomain.TEXT
    })
    extension: string;
   
    @FieldInfo({
        key: 'path',
        description: ['path','in path'],
        domain: StandardDomain.TEXT
    })
    path: string;

    @FieldInfo({
        key: 'filename',
        description: ['file name','filename'],
        domain: StandardDomain.TEXT
    })
    fileName: string;
}
@ClassInfo({
    key: 'issue-search',
    description: 'Issue search'
})

export class IssueSearch  extends AdvancedSearch {
    @FieldInfo({
        key: 'state',
        description: ['issue state','state'],
        domain: ['open','closed']
    })
    issueState: string;

    @FieldInfo({
        key: 'comments',
        description: ['number of issue comments', 'number of comments','amount of comments','comments'],
        domain: StandardDomain.NUMBER
    })
    issueComments: number;

    @FieldInfo({
        key: 'label',
        description: ['issue label','labels'],
        domain: StandardDomain.TEXT
    })
    issueLabel: string;

    @FieldInfo({
        key: 'issueCreator',
        description: ['issue author','opened by', 'issue author'],
        domain: StandardDomain.TEXT
    })
    issueCreator: string;


    @FieldInfo({
        key: 'mentions',
        description: ['mention','mentions'],
        domain: StandardDomain.TEXT
    })
    mentions: string;


    @FieldInfo({
        key: 'assignee',
        description: ['issue assignee','assignee','assigned to','assigned'],
        domain: StandardDomain.TEXT
    })
    issueAssignee: string;


    @FieldInfo({
        key: 'updated',
        description: ['issue updated before','updated before','wiki updated'],
        domain: StandardDomain.DATE
    })
    issueUpdated: Date;
}

@ClassInfo({
    key: 'issue-search',
    description: 'User search'
})

export class UserSearch extends AdvancedSearch {
    @FieldInfo({
        key: 'fullname',
        description: ['user full name','full name', 'name'],
        domain: StandardDomain.TEXT
    })
    fullname: Date;

    @FieldInfo({
        key: 'location',
        description: ['user location','location', 'from'],
        domain: StandardDomain.TEXT
    })
    location: String;

    @FieldInfo({
        key: 'followers',
        description: ['user follower count','user follower amount','followers','amount of followers','number of followers'],
        domain: StandardDomain.NUMBER
    })
    followers: number;


    @FieldInfo({
        key: 'repos',
        description: ['user amount of repos','amount of repos','number of repos','amount of repositories','number of repositories'],
        domain: StandardDomain.NUMBER
    })
    userRepos: number;


}



/*
@ClassInfo({
    key: 'github-search',
    description: 'github search'
})
export class GitHubSearch {

    @FieldInfo({
        key: allFieldsKey,
        description: ["content", "contains", "containing", "about", "all of"],
        domain: StandardDomain.TEXT
    })
    allFields: string;

    @FieldInfo({
        key: 'user',
        description: ["owner", "owners", "from","user"],
        domain: StandardDomain.TEXT
    })
    owner: string;

    @FieldInfo({
        key: 'repo',
        description: ["repositories", "repos","repo"],
        domain: StandardDomain.TEXT
    })
    repository: string;

    @FieldInfo({
        key: 'created',
        description: ["creation date", "created"],
        domain: StandardDomain.DATE
    })
    date: Date;

    @FieldInfo({
        key: 'language',
        description: ["language","user language","repo language"],
        domain: ['C', 'C#', 'C++', 'CoffeeScript', 'CSS', 'Dart', 'DM', 'Elixir', 'Go', 'Groovy', 'HTML', 'Java', 'JavaScript', 'Kotlin', 'Objective-C', 'Perl', 'PHP', 'PowerShell', 'Python', 'Ruby', 'Rust', 'Scala', 'Shell', 'Swift', 'TypeScript', '4D', 'ABAP', 'ABNF', 'ActionScript', 'Ada', 'Adobe Font Metrics', 'Agda', 'AGS Script', 'AL', 'Alloy', 'Alpine Abuild', 'Altium Designer', 'AMPL', 'AngelScript', 'Ant Build System', 'ANTLR', 'ApacheConf', 'Apex', 'API Blueprint', 'APL', 'Apollo Guidance Computer', 'AppleScript', 'Arc', 'AsciiDoc', 'ASL', 'ASN.1', 'ASP.NET', 'AspectJ', 'Assembly', 'Asymptote', 'ATS', 'Augeas', 'AutoHotkey', 'AutoIt', 'Avro IDL', 'Awk', 'Ballerina', 'Batchfile', 'Befunge', 'BibTeX', 'Bison', 'BitBake', 'Blade', 'BlitzBasic', 'BlitzMax', 'Bluespec', 'Boo', 'Brainfuck', 'Brightscript', 'Browserslist', 'C-ObjDump', 'C2hs Haskell', 'Cabal Config', "Cap'n Proto", 'CartoCSS', 'Ceylon', 'Chapel', 'Charity', 'ChucK', 'Cirru', 'Clarion', 'Classic ASP', 'Clean', 'Click', 'CLIPS', 'Clojure', 'Closure Templates', 'Cloud Firestore Security Rules', 'CMake', 'COBOL', 'CodeQL', 'ColdFusion', 'ColdFusion CFC', 'COLLADA', 'Common Lisp', 'Common Workflow Language', 'Component Pascal', 'CoNLL-U', 'Cool', 'Coq', 'Cpp-ObjDump', 'Creole', 'Crystal', 'CSON', 'Csound', 'Csound Document', 'Csound Score', 'CSV', 'Cuda', 'cURL Config', 'CWeb', 'Cycript', 'Cython', 'D', 'D-ObjDump', 'Dafny', 'Darcs Patch', 'DataWeave', 'desktop', 'Dhall', 'Diff', 'DIGITAL Command Language', 'dircolors', 'DirectX 3D File', 'DNS Zone', 'Dockerfile', 'Dogescript', 'DTrace', 'Dylan', 'E', 'Eagle', 'Easybuild', 'EBNF', 'eC', 'Ecere Projects', 'ECL', 'ECLiPSe', 'EditorConfig', 'Edje Data Collection', 'edn', 'Eiffel', 'EJS', 'Elm', 'Emacs Lisp', 'EmberScript', 'EML', 'EQ', 'Erlang', 'F#', 'F*', 'Factor', 'Fancy', 'Fantom', 'Faust', 'FIGlet Font', 'Filebench WML', 'Filterscript', 'fish', 'FLUX', 'Formatted', 'Forth', 'Fortran', 'Fortran Free Form', 'FreeMarker', 'Frege', 'Futhark', 'G-code', 'Game Maker Language', 'GAML', 'GAMS', 'GAP', 'GCC Machine Description', 'GDB', 'GDScript', 'GEDCOM', 'Genie', 'Genshi', 'Gentoo Ebuild', 'Gentoo Eclass', 'Gerber Image', 'Gettext Catalog', 'Gherkin', 'Git Attributes', 'Git Config', 'GLSL', 'Glyph', 'Glyph Bitmap Distribution Format', 'GN', 'Gnuplot', 'Golo', 'Gosu', 'Grace', 'Gradle', 'Grammatical Framework', 'Graph Modeling Language', 'GraphQL', 'Graphviz (DOT)', 'Groovy Server Pages', 'Hack', 'Haml', 'Handlebars', 'HAProxy', 'Harbour', 'Haskell', 'Haxe', 'HCL', 'HiveQL', 'HLSL', 'HolyC', 'HTML+Django', 'HTML+ECR', 'HTML+EEX', 'HTML+ERB', 'HTML+PHP', 'HTML+Razor', 'HTTP', 'HXML', 'Hy', 'HyPhy', 'IDL', 'Idris', 'Ignore List', 'IGOR Pro', 'Inform 7', 'INI', 'Inno Setup', 'Io', 'Ioke', 'IRC log', 'Isabelle', 'Isabelle ROOT', 'J', 'Jasmin', 'Java Properties', 'Java Server Pages', 'JavaScript+ERB', 'JFlex', 'Jison', 'Jison Lex', 'Jolie', 'JSON', 'JSON with Comments', 'JSON5', 'JSONiq', 'JSONLD', 'Jsonnet', 'JSX', 'Julia', 'Jupyter Notebook', 'Kaitai Struct', 'KiCad Layout', 'KiCad Legacy Layout', 'KiCad Schematic', 'Kit', 'KRL', 'LabVIEW', 'Lark', 'Lasso', 'Latte', 'Lean', 'Less', 'Lex', 'LFE', 'LilyPond', 'Limbo', 'Linker Script', 'Linux Kernel Module', 'Liquid', 'Literate Agda', 'Literate CoffeeScript', 'Literate Haskell', 'LiveScript', 'LLVM', 'Logos', 'Logtalk', 'LOLCODE', 'LookML', 'LoomScript', 'LSL', 'LTspice Symbol', 'Lua', 'M', 'M4', 'M4Sugar', 'Macaulay2', 'Makefile', 'Mako', 'Markdown', 'Marko', 'Mask', 'Mathematica', 'MATLAB', 'Maven POM', 'Max', 'MAXScript', 'mcfunction', 'MediaWiki', 'Mercury', 'Meson', 'Metal', 'Microsoft Developer Studio Project', 'MiniD', 'Mirah', 'mIRC Script', 'MLIR', 'Modelica', 'Modula-2', 'Modula-3', 'Module Management System', 'Monkey', 'Moocode', 'MoonScript', 'Motorola 68K Assembly', 'MQL4', 'MQL5', 'MTML', 'MUF', 'mupad', 'Muse', 'Mustache', 'Myghty', 'nanorc', 'NASL', 'NCL', 'Nearley', 'Nemerle', 'NEON', 'nesC', 'NetLinx', 'NetLinx+ERB', 'NetLogo', 'NewLisp', 'Nextflow', 'Nginx', 'Nim', 'Ninja', 'Nit', 'Nix', 'NL', 'NPM Config', 'NSIS', 'Nu', 'NumPy', 'NWScript', 'ObjDump', 'Object Data Instance Notation', 'Objective-C++', 'Objective-J', 'ObjectScript', 'OCaml', 'Odin', 'Omgrofl', 'ooc', 'Opa', 'Opal', 'Open Policy Agent', 'OpenCL', 'OpenEdge ABL', 'OpenQASM', 'OpenRC runscript', 'OpenSCAD', 'OpenStep Property List', 'OpenType Feature File', 'Org', 'Ox', 'Oxygene', 'Oz', 'P4', 'Pan', 'Papyrus', 'Parrot', 'Parrot Assembly', 'Parrot Internal Representation', 'Pascal', 'Pawn', 'Pep8', 'Pic', 'Pickle', 'PicoLisp', 'PigLatin', 'Pike', 'PlantUML', 'PLpgSQL', 'PLSQL', 'Pod', 'Pod 6', 'PogoScript', 'Pony', 'PostCSS', 'PostScript', 'POV-Ray SDL', 'PowerBuilder', 'Prisma', 'Processing', 'Proguard', 'Prolog', 'Propeller Spin', 'Protocol Buffer', 'Public Key', 'Pug', 'Puppet', 'Pure Data', 'PureBasic', 'PureScript', 'Python console', 'Python traceback', 'q', 'Q#', 'QMake', 'QML', 'Qt Script', 'Quake', 'R', 'Racket', 'Ragel', 'Raku', 'RAML', 'Rascal', 'Raw token data', 'RDoc', 'Readline Config', 'REALbasic', 'Reason', 'Rebol', 'Red', 'Redcode', 'Regular Expression', "Ren'Py", 'RenderScript', 'ReScript', 'reStructuredText', 'REXX', 'Rich Text Format', 'Ring', 'Riot', 'RMarkdown', 'RobotFramework', 'Roff', 'Roff Manpage', 'Rouge', 'RPC', 'RPM Spec', 'RUNOFF', 'Sage', 'SaltStack', 'SAS', 'Sass', 'Scaml', 'Scheme', 'Scilab', 'SCSS', 'sed', 'Self', 'ShaderLab', 'ShellSession', 'Shen', 'Sieve', 'Slash', 'Slice', 'Slim', 'Smali', 'Smalltalk', 'Smarty', 'SmPL', 'SMT', 'Solidity', 'SourcePawn', 'SPARQL', 'Spline Font Database', 'SQF', 'SQL', 'SQLPL', 'Squirrel', 'SRecode Template', 'SSH Config', 'Stan', 'Standard ML', 'Starlark', 'Stata', 'STON', 'Stylus', 'SubRip Text', 'SugarSS', 'SuperCollider', 'Svelte', 'SVG', 'SWIG', 'SystemVerilog', 'Tcl', 'Tcsh', 'Tea', 'Terra', 'TeX', 'Texinfo', 'Text', 'Textile', 'Thrift', 'TI Program', 'TLA', 'TOML', 'TSQL', 'TSV', 'TSX', 'Turing', 'Turtle', 'Twig', 'TXL', 'Type Language', 'Unified Parallel C', 'Unity3D Asset', 'Unix Assembly', 'Uno', 'UnrealScript', 'UrWeb', 'V', 'Vala', 'VBA', 'VBScript', 'VCL', 'Verilog', 'VHDL', 'Vim Help File', 'Vim script', 'Vim Snippet', 'Visual Basic .NET', 'Volt', 'Vue', 'Wavefront Material', 'Wavefront Object', 'wdl', 'Web Ontology Language', 'WebAssembly', 'WebIDL', 'WebVTT', 'Wget Config', 'Windows Registry Entries', 'wisp', 'Wollok', 'World of Warcraft Addon Data', 'X BitMap', 'X Font Directory Index', 'X PixMap', 'X10', 'xBase', 'XC', 'XCompose', 'XML', 'XML Property List', 'Xojo', 'XPages', 'XProc', 'XQuery', 'XS', 'XSLT', 'Xtend', 'Yacc', 'YAML', 'YANG', 'YARA', 'YASnippet', 'ZAP', 'Zeek', 'ZenScript', 'Zephir', 'Zig', 'ZIL', 'Zimpl']
    })
    language: string;


    @FieldInfo({
        key: 'stars',
        description: ['stars','likes'],
        domain:StandardDomain.NUMBER
    })
    stars: number;

    @FieldInfo({
        key: 'size',
        description: ['size kb','size', 'file size'],
        domain:StandardDomain.NUMBER
    })
    sizeKb: number;

    @FieldInfo({
        key: 'pushed',
        description: ['pushed date','pushed to' ,'pushed','change date','change'],
        domain:StandardDomain.DATE
    })
    pushedDate: Date;

    @FieldInfo({
        key: 'license',
        description: 'license',
        domain: ['BSD Zero Clause License', 'Academic Free License v3.0', 'GNU Affero General Public License v3.0', 'Apache License 2.0', 'Artistic License 2.0', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'BSD 3-Clause Clear License', 'BSD 4-Clause "Original" or "Old" License', 'Boost Software License 1.0', 'Creative Commons Attribution 4.0 International', 'Creative Commons Attribution Share Alike 4.0 International', 'Creative Commons Zero v1.0 Universal', 'CeCILL Free Software License Agreement v2.1', 'Educational Community License v2.0', 'Eclipse Public License 1.0', 'Eclipse Public License 2.0', 'European Union Public License 1.1', 'European Union Public License 1.2', 'GNU General Public License v2.0', 'GNU General Public License v3.0', 'ISC License', 'GNU Lesser General Public License v2.1', 'GNU Lesser General Public License v3.0', 'LaTeX Project Public License v1.3c', 'MIT License', 'Mozilla Public License 2.0', 'Microsoft Public License', 'Microsoft Reciprocal License', 'University of Illinois/NCSA Open Source License', 'ODC Open Database License v1.0', 'SIL Open Font License 1.1', 'Open Software License 3.0', 'PostgreSQL License', 'The Unlicense', 'Universal Permissive License v1.0', 'Vim License', 'Do What The F*ck You Want To Public License', 'zlib License', 'Creative Commons', 'GNU General Public License', 'GNU Lesser General Public License']
    })
    license: string;

    @FieldInfo({
        key: 'fork',
        description: 'fork filter',
        domain: {
            'only' : 'only forks',
            'and' : 'include forks'

        }
    })
    forkOption: string;


    @FieldInfo({
        key: 'extension',
        description: ['file extension','extension'],
        domain: StandardDomain.TEXT
    })
    extension: string;


   
    @FieldInfo({
        key: 'path',
        description: ['path','in path'],
        domain: StandardDomain.TEXT
    })
    path: string;

    @FieldInfo({
        key: 'filename',
        description: ['file name','filename'],
        domain: StandardDomain.TEXT
    })
    fileName: string;

    @FieldInfo({
        key: 'state',
        description: ['issue state','state'],
        domain: ['open','closed']
    })
    issueState: string;

    @FieldInfo({
        key: 'comments',
        description: ['number of issue comments', 'number of comments','amount of comments','comments'],
        domain: StandardDomain.NUMBER
    })
    issueComments: number;

    @FieldInfo({
        key: 'label',
        description: ['issue label','labels'],
        domain: StandardDomain.TEXT
    })
    issueLabel: string;

    @FieldInfo({
        key: 'issueCreator',
        description: ['issue author','opened by', 'issue author'],
        domain: StandardDomain.TEXT
    })
    issueCreator: string;


    @FieldInfo({
        key: 'mentions',
        description: ['mention','mentions'],
        domain: StandardDomain.TEXT
    })
    mentions: string;


    @FieldInfo({
        key: 'assignee',
        description: ['issue assignee','assignee','assigned to','assigned'],
        domain: StandardDomain.TEXT
    })
    issueAssignee: string;


    @FieldInfo({
        key: 'updated',
        description: ['issue updated before','updated before','wiki updated'],
        domain: StandardDomain.DATE
    })
    issueUpdated: Date;


    @FieldInfo({
        key: 'fullname',
        description: ['user full name','full name', 'name'],
        domain: StandardDomain.TEXT
    })
    fullname: Date;

    @FieldInfo({
        key: 'location',
        description: ['user location','location', 'from'],
        domain: StandardDomain.TEXT
    })
    location: String;

    @FieldInfo({
        key: 'followers',
        description: ['user follower count','user follower amount','followers','amount of followers','number of followers'],
        domain: StandardDomain.NUMBER
    })
    followers: number;


    @FieldInfo({
        key: 'repos',
        description: ['user amount of repos','amount of repos','number of repos','amount of repositories','number of repositories'],
        domain: StandardDomain.NUMBER
    })
    userRepos: number;


}*/