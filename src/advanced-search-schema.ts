import { StandardDomain } from '@quantleaf/query-schema';
import { ClassInfo, FieldInfo } from '@quantleaf/query-sdk-node'; //, translate, config

export const allFieldsKey = 'allFields';
export const allFieldsExactMatchKey = 'allFieldsExactMatch';

export const userSchemaKey = 'user';
export const repoSchemaKey = 'repo';
export const issueSchemaKey = 'issue';
export const codeSchemaKey = 'code';
export const generalSchemaKey = 'general';
export const topicSchemaKey = 'topic';
export const discussionSchemaKey = 'discussion';
export const commitSchemaKey = 'commits';

const ownerFieldKey  = 'user';
const authorFieldKey  = 'author';
const involvesFieldKey  = 'involves';
const commenterFieldKey  = 'commenter';
const mentionsFieldKey  = 'mentions';
const assigneeFieldKey  = 'assignee';
const reviewedByFieldKey = 'reviewed-by';
const reviewRequestedFieldKey = 'review-requested';

export const userNameFields:Set<string> = new Set<string>([ownerFieldKey,authorFieldKey,commenterFieldKey,mentionsFieldKey,assigneeFieldKey,reviewedByFieldKey,reviewRequestedFieldKey])



class TextSearch {

    @FieldInfo({
        key: allFieldsKey,
        description: ["contains", "content", "match","matches", "containing", "about", "all of"],
        domain: StandardDomain.TEXT
    })
    allFields: string;

    @FieldInfo({
        key: allFieldsExactMatchKey,
        description: ["contains exactly","perfect match", "exact match", "matches exactly"],
        domain: StandardDomain.TEXT
    })
    allFieldsExactMatch: string;
}

class TextDateSearch extends TextSearch {

    @FieldInfo({
        key: 'created',
        description: ["creation date", "created"],
        domain: StandardDomain.DATE
    })
    date: Date;

}

@ClassInfo({
    key: generalSchemaKey,
    description: 'Advanced Search'
})
export class AdvancedSearch extends TextDateSearch {
    @FieldInfo({
        key: ownerFieldKey,
        description: ["owner", "owners", "from","user"],
        domain: StandardDomain.TEXT
    })
    owner: string;

    @FieldInfo({
        key: 'org',
        description: ["organisation", "org"],
        domain: StandardDomain.TEXT
    })
    organisation: string;

    @FieldInfo({
        key: 'repo',
        description: ["repository","repositories", "repos","repo"],
        domain: StandardDomain.TEXT
    })
    repository: string;
    

    @FieldInfo({
        key: 'language',
        description: ["language","user language","repo language"],
        domain: ['C', 'C#', 'C++', 'CoffeeScript', 'CSS', 'Dart', 'DM', 'Elixir', 'Go', 'Groovy', 'HTML', 'Java', 'JavaScript', 'Kotlin', 'Objective-C', 'Perl', 'PHP', 'PowerShell', 'Python', 'Ruby', 'Rust', 'Scala', 'Shell', 'Swift', 'TypeScript', '4D', 'ABAP', 'ABNF', 'ActionScript', 'Ada', 'Adobe Font Metrics', 'Agda', 'AGS Script', 'AL', 'Alloy', 'Alpine Abuild', 'Altium Designer', 'AMPL', 'AngelScript', 'Ant Build System', 'ANTLR', 'ApacheConf', 'Apex', 'API Blueprint', 'APL', 'Apollo Guidance Computer', 'AppleScript', 'Arc', 'AsciiDoc', 'ASL', 'ASN.1', 'ASP.NET', 'AspectJ', 'Assembly', 'Asymptote', 'ATS', 'Augeas', 'AutoHotkey', 'AutoIt', 'Avro IDL', 'Awk', 'Ballerina', 'Batchfile', 'Befunge', 'BibTeX', 'Bison', 'BitBake', 'Blade', 'BlitzBasic', 'BlitzMax', 'Bluespec', 'Boo', 'Brainfuck', 'Brightscript', 'Browserslist', 'C-ObjDump', 'C2hs Haskell', 'Cabal Config', "Cap'n Proto", 'CartoCSS', 'Ceylon', 'Chapel', 'Charity', 'ChucK', 'Cirru', 'Clarion', 'Classic ASP', 'Clean', 'Click', 'CLIPS', 'Clojure', 'Closure Templates', 'Cloud Firestore Security Rules', 'CMake', 'COBOL', 'CodeQL', 'ColdFusion', 'ColdFusion CFC', 'COLLADA', 'Common Lisp', 'Common Workflow Language', 'Component Pascal', 'CoNLL-U', 'Cool', 'Coq', 'Cpp-ObjDump', 'Creole', 'Crystal', 'CSON', 'Csound', 'Csound Document', 'Csound Score', 'CSV', 'Cuda', 'cURL Config', 'CWeb', 'Cycript', 'Cython', 'D', 'D-ObjDump', 'Dafny', 'Darcs Patch', 'DataWeave', 'desktop', 'Dhall', 'Diff', 'DIGITAL Command Language', 'dircolors', 'DirectX 3D File', 'DNS Zone', 'Dockerfile', 'Dogescript', 'DTrace', 'Dylan', 'E', 'Eagle', 'Easybuild', 'EBNF', 'eC', 'Ecere Projects', 'ECL', 'ECLiPSe', 'EditorConfig', 'Edje Data Collection', 'edn', 'Eiffel', 'EJS', 'Elm', 'Emacs Lisp', 'EmberScript', 'EML', 'EQ', 'Erlang', 'F#', 'F*', 'Factor', 'Fancy', 'Fantom', 'Faust', 'FIGlet Font', 'Filebench WML', 'Filterscript', 'fish', 'FLUX', 'Formatted', 'Forth', 'Fortran', 'Fortran Free Form', 'FreeMarker', 'Frege', 'Futhark', 'G-code', 'Game Maker Language', 'GAML', 'GAMS', 'GAP', 'GCC Machine Description', 'GDB', 'GDScript', 'GEDCOM', 'Genie', 'Genshi', 'Gentoo Ebuild', 'Gentoo Eclass', 'Gerber Image', 'Gettext Catalog', 'Gherkin', 'Git Attributes', 'Git Config', 'GLSL', 'Glyph', 'Glyph Bitmap Distribution Format', 'GN', 'Gnuplot', 'Golo', 'Gosu', 'Grace', 'Gradle', 'Grammatical Framework', 'Graph Modeling Language', 'GraphQL', 'Graphviz (DOT)', 'Groovy Server Pages', 'Hack', 'Haml', 'Handlebars', 'HAProxy', 'Harbour', 'Haskell', 'Haxe', 'HCL', 'HiveQL', 'HLSL', 'HolyC', 'HTML+Django', 'HTML+ECR', 'HTML+EEX', 'HTML+ERB', 'HTML+PHP', 'HTML+Razor', 'HTTP', 'HXML', 'Hy', 'HyPhy', 'IDL', 'Idris', 'Ignore List', 'IGOR Pro', 'Inform 7', 'INI', 'Inno Setup', 'Io', 'Ioke', 'IRC log', 'Isabelle', 'Isabelle ROOT', 'J', 'Jasmin', 'Java Properties', 'Java Server Pages', 'JavaScript+ERB', 'JFlex', 'Jison', 'Jison Lex', 'Jolie', 'JSON', 'JSON with Comments', 'JSON5', 'JSONiq', 'JSONLD', 'Jsonnet', 'JSX', 'Julia', 'Jupyter Notebook', 'Kaitai Struct', 'KiCad Layout', 'KiCad Legacy Layout', 'KiCad Schematic', 'Kit', 'KRL', 'LabVIEW', 'Lark', 'Lasso', 'Latte', 'Lean', 'Less', 'Lex', 'LFE', 'LilyPond', 'Limbo', 'Linker Script', 'Linux Kernel Module', 'Liquid', 'Literate Agda', 'Literate CoffeeScript', 'Literate Haskell', 'LiveScript', 'LLVM', 'Logos', 'Logtalk', 'LOLCODE', 'LookML', 'LoomScript', 'LSL', 'LTspice Symbol', 'Lua', 'M', 'M4', 'M4Sugar', 'Macaulay2', 'Makefile', 'Mako', 'Markdown', 'Marko', 'Mask', 'Mathematica', 'MATLAB', 'Maven POM', 'Max', 'MAXScript', 'mcfunction', 'MediaWiki', 'Mercury', 'Meson', 'Metal', 'Microsoft Developer Studio Project', 'MiniD', 'Mirah', 'mIRC Script', 'MLIR', 'Modelica', 'Modula-2', 'Modula-3', 'Module Management System', 'Monkey', 'Moocode', 'MoonScript', 'Motorola 68K Assembly', 'MQL4', 'MQL5', 'MTML', 'MUF', 'mupad', 'Muse', 'Mustache', 'Myghty', 'nanorc', 'NASL', 'NCL', 'Nearley', 'Nemerle', 'NEON', 'nesC', 'NetLinx', 'NetLinx+ERB', 'NetLogo', 'NewLisp', 'Nextflow', 'Nginx', 'Nim', 'Ninja', 'Nit', 'Nix', 'NL', 'NPM Config', 'NSIS', 'Nu', 'NumPy', 'NWScript', 'ObjDump', 'Object Data Instance Notation', 'Objective-C++', 'Objective-J', 'ObjectScript', 'OCaml', 'Odin', 'Omgrofl', 'ooc', 'Opa', 'Opal', 'Open Policy Agent', 'OpenCL', 'OpenEdge ABL', 'OpenQASM', 'OpenRC runscript', 'OpenSCAD', 'OpenStep Property List', 'OpenType Feature File', 'Org', 'Ox', 'Oxygene', 'Oz', 'P4', 'Pan', 'Papyrus', 'Parrot', 'Parrot Assembly', 'Parrot Internal Representation', 'Pascal', 'Pawn', 'Pep8', 'Pic', 'Pickle', 'PicoLisp', 'PigLatin', 'Pike', 'PlantUML', 'PLpgSQL', 'PLSQL', 'Pod', 'Pod 6', 'PogoScript', 'Pony', 'PostCSS', 'PostScript', 'POV-Ray SDL', 'PowerBuilder', 'Prisma', 'Processing', 'Proguard', 'Prolog', 'Propeller Spin', 'Protocol Buffer', 'Public Key', 'Pug', 'Puppet', 'Pure Data', 'PureBasic', 'PureScript', 'Python console', 'Python traceback', 'q', 'Q#', 'QMake', 'QML', 'Qt Script', 'Quake', 'R', 'Racket', 'Ragel', 'Raku', 'RAML', 'Rascal', 'Raw token data', 'RDoc', 'Readline Config', 'REALbasic', 'Reason', 'Rebol', 'Red', 'Redcode', 'Regular Expression', "Ren'Py", 'RenderScript', 'ReScript', 'reStructuredText', 'REXX', 'Rich Text Format', 'Ring', 'Riot', 'RMarkdown', 'RobotFramework', 'Roff', 'Roff Manpage', 'Rouge', 'RPC', 'RPM Spec', 'RUNOFF', 'Sage', 'SaltStack', 'SAS', 'Sass', 'Scaml', 'Scheme', 'Scilab', 'SCSS', 'sed', 'Self', 'ShaderLab', 'ShellSession', 'Shen', 'Sieve', 'Slash', 'Slice', 'Slim', 'Smali', 'Smalltalk', 'Smarty', 'SmPL', 'SMT', 'Solidity', 'SourcePawn', 'SPARQL', 'Spline Font Database', 'SQF', 'SQL', 'SQLPL', 'Squirrel', 'SRecode Template', 'SSH Config', 'Stan', 'Standard ML', 'Starlark', 'Stata', 'STON', 'Stylus', 'SubRip Text', 'SugarSS', 'SuperCollider', 'Svelte', 'SVG', 'SWIG', 'SystemVerilog', 'Tcl', 'Tcsh', 'Tea', 'Terra', 'TeX', 'Texinfo', 'Text', 'Textile', 'Thrift', 'TI Program', 'TLA', 'TOML', 'TSQL', 'TSV', 'TSX', 'Turing', 'Turtle', 'Twig', 'TXL', 'Type Language', 'Unified Parallel C', 'Unity3D Asset', 'Unix Assembly', 'Uno', 'UnrealScript', 'UrWeb', 'V', 'Vala', 'VBA', 'VBScript', 'VCL', 'Verilog', 'VHDL', 'Vim Help File', 'Vim script', 'Vim Snippet', 'Visual Basic .NET', 'Volt', 'Vue', 'Wavefront Material', 'Wavefront Object', 'wdl', 'Web Ontology Language', 'WebAssembly', 'WebIDL', 'WebVTT', 'Wget Config', 'Windows Registry Entries', 'wisp', 'Wollok', 'World of Warcraft Addon Data', 'X BitMap', 'X Font Directory Index', 'X PixMap', 'X10', 'xBase', 'XC', 'XCompose', 'XML', 'XML Property List', 'Xojo', 'XPages', 'XProc', 'XQuery', 'XS', 'XSLT', 'Xtend', 'Yacc', 'YAML', 'YANG', 'YARA', 'YASnippet', 'ZAP', 'Zeek', 'ZenScript', 'Zephir', 'Zig', 'ZIL', 'Zimpl']
    })
    language: string;

}

@ClassInfo({
    key: repoSchemaKey,
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
        description: ['size kb','size', 'repo size'],
        domain:StandardDomain.NUMBER
    })
    sizeKb: number;

    @FieldInfo({
        key: 'pushed',
        description: ['pushed date','pushed to' ,'pushed','change date','change','date'],
        domain:StandardDomain.DATE
    })
    pushedDate: Date;

    @FieldInfo({
        key: 'license',
        description: 'license',
        domain: 
        {
            "0bsd" : "BSD Zero Clause License",
            "afl-3.0" : "Academic Free License v3.0",
            "agpl-3.0" : "GNU Affero General Public License v3.0",
            "apache-2.0" : "Apache License 2.0",
            "artistic-2.0" : "Artistic License 2.0",
            "bsd-2-clause" : ['BSD 2-Clause','BSD 2-Clause "Simplified" License'],
            "bsd-3-clause" : ['BSD 3-Clause','BSD 3-Clause "New" or "Revised" License'],
            "bsd-3-clause-clear" : "BSD 3-Clause Clear License",
            "bsd-4-clause" : ['BSD 4-Clause','BSD 4-Clause "Original" or "Old" License'],
            "bsl-1.0" : "Boost Software License 1.0",
            "cc-by-4.0" : "Creative Commons Attribution 4.0 International",
            "cc-by-sa-4.0" : "Creative Commons Attribution Share Alike 4.0 International",
            "cc0-1.0" : "Creative Commons Zero v1.0 Universal",
            "cecill-2.1" : "CeCILL Free Software License Agreement v2.1",
            "ecl-2.0" : "Educational Community License v2.0",
            "epl-1.0" : "Eclipse Public License 1.0",
            "epl-2.0" : "Eclipse Public License 2.0",
            "eupl-1.1" : "European Union Public License 1.1",
            "eupl-1.2" : "European Union Public License 1.2",
            "gpl-2.0" : "GNU General Public License v2.0",
            "gpl-3.0" : "GNU General Public License v3.0",
            "isc" : "ISC License",
            "lgpl-2.1" : "GNU Lesser General Public License v2.1",
            "lgpl-3.0" : "GNU Lesser General Public License v3.0",
            "lppl-1.3c" : "LaTeX Project Public License v1.3c",
            "mit" : "MIT License",
            "mpl-2.0" : "Mozilla Public License 2.0",
            "ms-pl" : "Microsoft Public License",
            "ms-rl" : "Microsoft Reciprocal License",
            "ncsa" : "University of Illinois/NCSA Open Source License",
            "odbl-1.0" : "ODC Open Database License v1.0",
            "ofl-1.1" : "SIL Open Font License 1.1",
            "osl-3.0" : "Open Software License 3.0",
            "postgresql" : "PostgreSQL License",
            "unlicense" : "The Unlicense",
            "upl-1.0" : "Universal Permissive License v1.0",
            "vim" : "Vim License",
            "wtfpl" : "Do What The Fuck You Want To Public License",
            "zlib" : "zlib License",
            "cc" : "Creative Commons",
            "gpl" : "GNU General Public License",
            "lgpl" : "GNU Lesser General Public License"
        }
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
        key: 'forks',
        description: ['amount of forks','forks amount','forks count','number of forks'],
        domain: StandardDomain.NUMBER
    })
    numberOfForks: string;

    @FieldInfo({
        key: 'topic',
        description: ['topic'],
        domain: StandardDomain.TEXT
    })
    repositoryTopic: string;

    @FieldInfo({
        key: 'topics',
        description: ['amount of topics','topics amount','topics count','number of topics'],
        domain: StandardDomain.NUMBER
    })
    numberOfTopics: string;

    @FieldInfo({
        key: 'is',
        description: ['repository settings'],
        domain: ['public','private','internal']
    })
    repositorySettings: string;

    @FieldInfo({
        key: 'archived',
        description: ['archivation status'],
        domain: {
            'false' : ['is not archived','not archived'],
            'true' : ['is archived','archived'],
        }
    })
    archivationStatus: string;

    @FieldInfo({
        key: 'help-wanted-issues',
        description: ['number of help wanted issues'],
        domain: StandardDomain.NUMBER
    })
    numberOfHelpWantedIssues: number;

    @FieldInfo({
        key: 'good-first-issues',
        description: ['number of good first issues'],
        domain: StandardDomain.NUMBER
    })
    numberOfgoodFirstIssues: number;

}

@ClassInfo({
    key: topicSchemaKey,
    description: 'Topic search'
})

export class TopicSearch  extends TextDateSearch {

    @FieldInfo({
        key: 'is',
        description: ['topic status'],
        domain: ['featured','curated','internal']
    })
    repositorySettings: string;

    @FieldInfo({
        key: 'repositories',
        description: ['topic number of repositories','topic number of repos','number of repos','amount of repos'],
        domain: StandardDomain.NUMBER
    })
    topicWithNumberOfRepositories: number;
}


@ClassInfo({
    key: commitSchemaKey,
    description: 'Commit search'
})

export class CommitSearch extends TextSearch  {

    @FieldInfo({
        key: 'committer',
        description: ['committer username'],
        domain: StandardDomain.TEXT})
    commiter: string;

    @FieldInfo({
        key: 'committer-name',
        description: ['committer name'],
        domain: StandardDomain.TEXT})
    committerName: string;

    @FieldInfo({
        key: 'committer-email',
        description: ['committer email'],
        domain: StandardDomain.TEXT})
    committerEmail: string;

    @FieldInfo({
        key: 'committer-date',
        description: ['commit date', 'committed date', 'committer date'],
        domain: StandardDomain.DATE})
    commitDate: Date;

    @FieldInfo({
        key: 'merge',
        description: ['commit type'],
        domain: {
            'true' : ['merged commit','merged commits'],
            'false' : ['non merged commit','non-merged commits']
        }

        })
    commitType: string;

    @FieldInfo({
        key: 'hash',
        description: ['commit hash'],
        domain: StandardDomain.TEXT

        })
    commitHash: string;

    @FieldInfo({
        key: 'parent',
        description: ['parent hash'],
        domain: StandardDomain.TEXT

        })
    parentHash: string;


    @FieldInfo({
        key: 'tree',
        description: ['tree hash'],
        domain: StandardDomain.TEXT

        })
    treeHash: string;


    @FieldInfo({
        key: 'is',
        description: ['repository settings'],
        domain: ['public','private','internal']
    })
    repositorySettings: string;

    @FieldInfo({
        key: ownerFieldKey,
        description: ["owner", "owners", "from","user"],
        domain: StandardDomain.TEXT
    })
    owner: string;

    @FieldInfo({
        key: 'org',
        description: ["organisation", "org"],
        domain: StandardDomain.TEXT
    })
    organisation: string;

    @FieldInfo({
        key: 'repo',
        description: ["repository","repositories", "repos","repo"],
        domain: StandardDomain.TEXT
    })
    repository: string;
    
    
}


@ClassInfo({
    key: discussionSchemaKey,
    description: 'Discussion search'
})
export class DiscussionSearch  extends RepositorySearch {

    @FieldInfo({
        key: authorFieldKey,
        description: ['discussion creator','discussion author'],
        domain: StandardDomain.TEXT
    })
    discussionAuthor: string;

    @FieldInfo({
        key: involvesFieldKey,
        description: ['discussion involves user','discussion involves','involves'],
        domain: StandardDomain.TEXT
    })
    discussionInvolves: string;

    @FieldInfo({
        key: 'interactions',
        description: 'interactions',
        domain: StandardDomain.NUMBER
    })
    interactions: number;

    @FieldInfo({
        key: 'reactions',
        description: 'reactions',
        domain: StandardDomain.NUMBER
    })
    reactions: number;


    @FieldInfo({
        key: 'comments',
        description: ['number of discussion comments', 'number of comments','amount of comments'],
        domain: StandardDomain.NUMBER
    })
    discussionComments: number;

    @FieldInfo({
        key: commenterFieldKey,
        description: ['discussion commenter'],
        domain: StandardDomain.TEXT
    })
    discussionCommenter: string;

    @FieldInfo({
        key: 'updated',
        description: ["update date", "updated date","updated"],
        domain: StandardDomain.DATE
    })
    updatedDate: Date;
}



@ClassInfo({
    key: codeSchemaKey,
    description: 'Code search'
})

export class CodeSearch  extends AdvancedSearch {
    @FieldInfo({
        key: 'extension',
        description: ['file extension','extension', 'fileextension'],
        domain: StandardDomain.TEXT
    })
    extension: string;
   
    @FieldInfo({
        key: 'path',
        description: ['file path','path','in path', 'filepath'],
        domain: StandardDomain.TEXT
    })
    path: string;

    @FieldInfo({
        key: 'size',
        description: ['size kb','size', 'filse size'],
        domain:StandardDomain.NUMBER
    })
    sizeKb: number;

    @FieldInfo({
        key: 'filename',
        description: ['file name','filename'],
        domain: StandardDomain.TEXT
    })
    fileName: string;
}

@ClassInfo({
    key: issueSchemaKey,
    description: 'Issue and pull request search'
})
export class IssueAndPrSearch  extends AdvancedSearch {



    @FieldInfo({
        key: 'updated',
        description: ["updated date", "updated"],
        domain: StandardDomain.DATE
    })
    updatedDate: Date;

    @FieldInfo({
        key: 'is',
        description: ['status'],
        domain: 
        {
            'public' : 'public',
            'private' : 'private',
            'internal' : 'internal',
            'open' : 'open',
            'closed' : 'closed',
            'merged' : 'merged',
            'unmerged' : 'unmerged',
            'locked' : 'locked',
            'unlocked' : 'unlocked'  
        }
    })
    issueAndPullRequestSetting: string;


    @FieldInfo({
        key: 'type',
        description: ['type'],
        domain: 
        {
            'pr' : ['pull request','pull requests','pull requests','pr'],
            'issue' : ['issue','issues']
            
        }
    
    })
    issueOrPullrequestType: string;


    @FieldInfo({
        key: 'comments',
        description: ['number of issue comments', 'number of pull request comments', 'number of comments','amount of comments','comments'],
        domain: StandardDomain.NUMBER
    })
    issueComments: number;

    

    @FieldInfo({
        key: 'in',
        description: ['issue search location'],
        domain: ['title','body','comments']
    })
    issueSearchLocation: string;


    @FieldInfo({
        key: 'label',
        description: ['issue label','labels'],
        domain: StandardDomain.TEXT
    })
    issueLabel: string;

    @FieldInfo({
        key: authorFieldKey,
        description: ['author','issue creator','issue author','opened by', 'pr author','pull requets author' , 'pr creator','pull request creator'],
        domain: StandardDomain.TEXT
    })
    issueOrPrCreator: string;


    @FieldInfo({
        key: mentionsFieldKey,
        description: ['mention','mentions'],
        domain: StandardDomain.TEXT
    })
    mentions: string;


    @FieldInfo({
        key: assigneeFieldKey,
        description: ['assignee','assigned to','assigned','issue assignee', 'pull request assignee'],
        domain: StandardDomain.TEXT
    })
    issueOrPullRequestAssignee: string;

    @FieldInfo({
        key: 'team',
        description: ['team','issue team','pull request team'],
        domain: StandardDomain.TEXT
    })
    issueOrPullRequestTeam: string;

    @FieldInfo({
        key: commenterFieldKey,
        description: ['commenter','issue commenter','pr commenter', 'pull request commenter'],
        domain: StandardDomain.TEXT
    })
    commenter: string;


    @FieldInfo({
        key: involvesFieldKey,
        description: ['issue involves user','issue involves','involves','pull request involves user','pull request involves','involves', 'pr involves'],
        domain: StandardDomain.TEXT
    })
    issueInvolvesUser: string;


    @FieldInfo({
        key: 'linked',
        description: ['linking status'],
        domain: 
        {
            'pr' : ['linked pr','linked pull request','linked to pr','linked to pull request'],
            'issue' : ['linked issue','linked to issue']

        }
    })
    issueLinked: string;

    @FieldInfo({
        key: 'milestone',
        description: ['milestone'],
        domain: StandardDomain.NUMBER
    })
    milestone: string;


    @FieldInfo({
        key: 'project',
        description: ['issue project','pull request project','pr project'],
        domain: StandardDomain.TEXT
    })
    project: string;

    @FieldInfo({
        key: 'status',
        description: ['pull request status','pr status'],
        domain: ['pending','success','failure']
    })
    pullRequestStatus: string;

    @FieldInfo({
        key: 'head',
        description: ['pull request merge from branch','head branch name'],
        domain: StandardDomain.TEXT
    })
    headBranchName: string;

    @FieldInfo({
        key: 'base',
        description: ['pull request merge to branch','base branch name'],
        domain: StandardDomain.TEXT
    })
    baseBranchName: string;


    @FieldInfo({
        key: 'interactions',
        description: 'interactions',
        domain: StandardDomain.NUMBER
    })
    interactions: number;

    @FieldInfo({
        key: 'reactions',
        description: 'reactions',
        domain: StandardDomain.NUMBER
    })
    reactions: number;

    @FieldInfo({
        key: 'drafts',
        description: 'pull request draft status',
        domain: {
            'false' : ['no drafts','ready for review'],
            'true' : ['only drafts']
        }
    })
    draftStatus: string;


    @FieldInfo({
        key: 'review',
        description: 'pull request review status',
        domain: {
            'none' : ['not reviewed', 'not been reviewed'],
            'required' : ['review required'],
            'approved' : ['reviewer approved', 'approved'],
            'changes_requested' : ['reviewer changes requested', 'changes requested'],

        }
    })
    drafts: string;


    @FieldInfo({
        key: reviewedByFieldKey,
        description: 'reviewed by',
        domain: StandardDomain.TEXT
    })
    reviewedBy: string;

    @FieldInfo({
        key: reviewRequestedFieldKey,
        description: ['review requested to','review request'],
        domain: StandardDomain.TEXT
    })
    reviewedRequested: string;

    @FieldInfo({
        key: 'team-review-requested',
        description: ['review requested to team','team review request'],
        domain: StandardDomain.TEXT
    })
    teamReviewRequest: string;

    @FieldInfo({
        key: 'closed',
        description: ['closed','issue closed','pull request closed','pr closed'],
        domain: StandardDomain.DATE
    })
    closedDate: Date;

    @FieldInfo({
        key: 'merged',
        description: ['merge date','merged date','merging date','merged'],
        domain: StandardDomain.DATE
    })
    mergedDate: Date;

    @FieldInfo({
        key: 'no',
        description: ['missing metadata status'],
        domain: {
            'label' : 'missing label',
            'milestone' : 'missing milestone',
            'project' : 'missing project',
            'assignee' : 'missing assignee'
        }
    })
    missingMetaData: string;
}

@ClassInfo({
    key: userSchemaKey,
    description: 'User search'
})
export class UserSearch extends AdvancedSearch {
    @FieldInfo({
        key: 'fullname',
        description: ['full name','full name', 'user', 'name', 'username'],
        domain: StandardDomain.TEXT
    })
    fullname: Date;

    @FieldInfo({
        key: 'type',
        description: ['user type'],
        domain: {
            'user' : 'user',
            'org' : ['org', 'organisation']
        }
    })
    userType: Date;

    @FieldInfo({
        key: 'location',
        description: ['user location','location', 'from'],
        domain: StandardDomain.TEXT
    })
    location: String;

    @FieldInfo({
        key: 'followers',
        description: ['user follower count','user account followers','user follower amount','followers','amount of followers','number of followers'],
        domain: StandardDomain.NUMBER
    })
    followers: number;

    @FieldInfo({
        key: 'repos',
        description: ['user amount of repos','amount of repos','number of repos','amount of repositories','number of repositories'],
        domain: StandardDomain.NUMBER
    })
    userRepos: number;

    // Email, in username, in full name missing
}

// Missing packages search, needed?