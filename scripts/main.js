import { sleep, group, check, open } from "k6";
import { Rate } from 'k6/metrics';
import http from "k6/http";
import { config } from "../configurations/config.js";
import { check_error } from "./utils.js";

const test_mode = __ENV.test_mode;  // smoke, load, stress, soak
const base_url = config["base_url"]; 
const stages = config[test_mode]["stages"] ;

console.info("Configuration: ", JSON.stringify({ test_mode, base_url, stages }));

export let options = {
    stages: stages,
    insecureSkipTLSVerify: true,
    // thresholds means that the average duration of all HTTP requests should be less than 300 milliseconds.
    // And 95% of all HTTP requests should complete in less than 500 milliseconds.
    thresholds: { http_req_duration: ['avg<300', 'p(95)<500'] },
};

// Defining error rate
export let errorRate = new Rate('errors');
export default function main() {
    let response;

    const siteCodes = [
        "F33P", "F32F", "F023", "F31H", "F009", "F596", "F344", "F32M", "F34Y", "F694", 
        "F374", "F500", "F794", "F474", "F415", "F543", "F668", "F711", "F427", "F535", 
        "F509", "F32K", "F696", "F620", "F32P", "F688", "F716", "F32L", "F373", "F514", 
        "F674", "F706", "F737", "F469", "F012", "F569", "F32Q", "F705", "F437", "F745", 
        "F337", "F634", "F665", "F32C", "F518", "F590", "F381", "F783", "F017", "F323", 
        "F524", "F320", "FC30", "F377", "F605", "F31N", "F022", "FA37", "F398", "F406", 
        "F340", "F34W", "F371", "F389", "F593", "F573", "F016", "F637", "F493", "F466", 
        "F675", "F671", "F530", "F348", "F013", "F758", "FC33", "F645", "F512", "F396", 
        "F332", "F517", "F653", "F31X", "F32E", "F693", "F718", "F498", "F510", "F34G", 
        "F632", "F328", "FD32", "F008", "F027", "F614", "F793", "F335", "F33F", "F34F", 
        "F015", "F643", "F307", "F603", "F539", "F597", "F657", "F455", "F002", "F31T", 
        "F354", "F578", "F567", "F35G", "F581", "F522", "F408", "F435", "F31W", "F356", 
        "F591", "F31M", "F32I", "F459", "F568", "F684", "F778", "F34R", "F34T", "FA3D", 
        "F586", "F34X", "F553", "F026", "F625", "F606", "F755", "F347", "F667", "F32Y", 
        "F695", "F379", "F485", "F651", "F478", "FD31", "F32N", "F32S", "F472", "F741", 
        "F572", "F801", "F656", "F587", "F470", "F327", "F719", "F355", "F505", "FC05", 
        "F712", "F636", "F319", "F762", "F311", "FA34", "FD34", "FC36", "F788", "F31D", 
        "FA3A", "F457", "F411", "F679", "F609", "F404", "F502", "F363", "F792", "F487", 
        "F748", "F479", "F729", "F673", "F507", "F559", "F33H", "F31O", "F766", "F014", 
        "F442", "F390", "F519", "F484", "F34C", "F497", "F339", "F021", "F784", "F33X", 
        "F32H", "FA30", "F703", "F350", "F791", "F359", "F744", "FA3C", "F303", "F488", 
        "F630", "F31Z", "F616", "F631", "F756", "F32U", "F33O", "F025", "F34J", "F34P", 
        "F35H", "F326", "F380", "F666", "F343", "F678", "F34M", "F34U", "F418", "F782", 
        "F31K", "F414", "F589", "F31P", "F35I", "F446", "F010", "F570", "F649", "F403", 
        "F409", "F592", "F351", "F677", "F767", "F647", "F313", "F35D", "F385", "F336", 
        "F33U", "F353", "F554", "F733", "F310", "F31Q", "FD01", "F516", "F640", "F548", 
        "F617", "F439", "FC37", "F304", "F534", "F34E", "F32Z", "F34L", "F511", "F738", 
        "F480", "F372", "F560", "F558", "F669", "F325", "F400", "F378", "F34A", "F314", 
        "F571", "F399", "F387", "F501", "F020", "F602", "F405", "F31L", "F410", "F34V", 
        "F432", "F608", "F33M", "F655", "F547", "F746", "F32D", "F31A", "F33R", "F383", 
        "F006", "F32J", "F35B", "FA33", "F682", "F797", "F001", "F528", "F333", "F583", 
        "F35M", "FA02", "F31B", "F412", "F556", "F33G", "F717", "F358", "F492", "F334", 
        "F34S", "F35N", "F601", "F672", "F388", "FA31", "F732", "F610", "F376", "F607", 
        "F541", "F32O", "F575", "F664", "F786", "F329", "F599", "F615", "F32V", "F31G", 
        "F562", "F306", "F692", "F734", "F35E", "F346", "F31R", "F790", "F407", "F32R", 
        "F35K", "F33I", "F564", "F34I", "F580", "F33V", "F681", "F32G", "F499", "F433", 
        "F011", "F33L", "F520", "F527", "F007", "F35J", "F461", "F368", "F35F", "F431", 
        "F462", "F702", "F542", "F770", "F780", "F704", "FA38", "F33Q", "F654", "F369", 
        "F300", "F436", "FA32", "F360", "F402", "F621", "F35L", "F32W", "F506", "F423", 
        "F496", "F787", "F33W", "F31U", "F540", "F537", "F781", "F301", "F33J", "FD36", 
        "F324", "F680", "F550", "F32T", "F595", "F34O", "F561", "F618", "F31I", "F31Y", 
        "F799", "F349", "FC04", "F004", "F740", "F31J", "F566", "FC03", "F661", "F754", 
        "F494", "F789", "F796", "F628", "F660", "F31S", "F31E", "F330", "F785", "F775", 
        "F31F", "F598", "F464", "F005", "F648", "F33Y", "F322", "F546", "F393", "F690", 
        "F362", "F394", "F468", "F416", "F003", "F33D", "FD30", "F652", "FD33", "F565", 
        "F413", "F34H", "F676", "F445", "F429", "F471", "F585", "F644", "F457", "F693", 
        "F472", "F414", "FA03"
      ];

    group(`get_store_by_store_code`, function () {
        for (const code of siteCodes) {
            response = http.get(`http://superapps-api.apps.okd4.okd.stag/store/code?siteCode=${code}`);
            check_error(response);
            sleep(1);  
        }
    });

    const coordinates = [ [106.6815852, -6.187366], [107.7003187, -6.203439], [106.6812168, -6.175074], [106.6741334, -6.271896], [98.8625656, 3.57602], [112.2681412, -7.2854205], [106.6877888, -6.2242], [110.0415793, -6.978692], [106.6926168, -6.382749], [106.6915781, -6.375949], [115.5179225, -8.712003], [124.4834372, 1.484382], [106.6783228, -6.244505], [106.6633881, -6.1940542], [111.1536174, -7.622523], [106.6728451, -6.153102], [98.864453, 3.59951], [106.6842556, -6.223284], [104.74884594638861, -2.939393115762432], [106.6891884, -6.1457617], [112.2534337, -7.878535], [106.6830184, -6.2155701], [112.2607091, -7.937958], [106.6745516, -6.37641], [116.61073, -8.5944], [112.2623808, -7.975421], [106.6677629, -6.213623136], [106.6772826, -6.169321], [116.6117889, -8.588542], [0.0, 0.0], [106.6869718, -6.269198], [106.6653186, -6.301477], [106.6892496, -6.1461907], [110.038641, -7.782324], [106.6791658, -6.241777], [106.6861831, -6.312598], [107.7604812, -6.921918862], [112.2749998, -7.262046], [115.5185479, -8.723516], [103.3587182, -1.621806], [106.6522482, -6.230628], [106.6826557, -6.162651], [106.6797327, -6.266679], [100.0357464, -0.912489], [107.7610924, -6.908333], [106.6732215, -6.137056], [106.6985016, -6.249127], [107.7581794, -6.880025582], [106.6834759, -6.372883], [106.699136, -6.250214], [102.2268732, -3.80973], [98.8654906, 3.590854], [106.6811511, -6.226278], [110.0366531, -7.792664], [110.0457102, -7.006967], [107.7771405, -6.934431], [106.6844712, -6.380165], [107.7929373, -6.835799], [106.6907457, -6.1581205], [106.6637824, -6.285081], [107.7146582, -6.258522], [119.9475397, -5.144909], [100.0354463, -0.945495], [106.6606797, -6.227227], [104.4010325, 1.132119], [106.6742535, -6.112226], [106.6616461, -6.186388], [112.2660876, -7.250829], [115.518548, -8.715763], [116.60854445, -8.5912594], [110.081012, -7.563086], [106.6894228, -6.238327], [104.4761536, -2.991328], [106.6657683, -6.129303], [106.73449817640555, -6.188034568033692], [110.0807554, -7.566404], [106.6833793, -6.344251], [107.7020326, -6.259561], [110.0374605, -7.783172], [112.2743661, -7.291293], [110.0374431, -7.776748], [107.7611848, -6.901125], [108.8219347, -7.336577], [112.2729823, -7.294186], [106.6841134, -6.17643], [106.6891469, -6.196193], [106.84809186983519, -6.558809714336215], [107.7594596, -6.9154607], [110.0814958, -7.60061], [106.6852907, -6.155277], [117.7115205, -0.526316], [115.5207686, -8.639053], [107.7580428, -6.960039685], [106.6865412, -6.262482], [112.2747756, -7.262851], [98.866867, 3.59453], [106.6609037, -6.228611], [106.6829041, -6.256902], [107.7575633, -6.932035], [106.6974855, -6.184112], [110.0362488, -7.720968], [106.6829897, -6.280364], [106.685234, -6.256825], [106.6855486, -6.256365], [98.8687997, 3.781764], [110.022497, -7.50389], [119.9435896, -5.163165], [112.269844, -7.44614], [106.6643205, -6.179665], [106.6524574, -6.260859], [106.6877422, -6.164148], [98.8665376, 3.608864], [106.6971765, -6.270732], [106.6812249, -6.611733], [104.4763445, -2.980689], [106.6855534, -6.242608], [106.6790642, -6.176642], [105.5253921, -5.417067], [107.7539617, -6.878152], [109.9119648, -6.869672], [106.6850482, -6.230207], [106.6797114, -6.227171], [106.6920181, -6.377984], [110.039907, -7.760094], [106.6741989, -6.197777], [106.6729014, -6.138551], [106.686002, -6.367016], [107.7609107, -6.908685], [98.8656771, 3.678679], [107.7613439, -6.907159], [115.5259145, -8.684026], [106.6989085, -6.246969], [112.2431891, 7.477312], [107.760901, -6.9170876], [106.6739213, -6.187323], [107.7658407, -6.943413], [110.0349911, -7.780844], [109.9240258, -7.427507], [107.7445344, -6.400775], [104.4012647, 1.146653], [107.7306966, -6.308843], [106.682133, -6.192864], [106.6752843, -6.112207], [101.1420394, 0.500513], [106.6713394, -6.15595], [110.0421445, -6.979129], [106.6676763, -6.159893], [107.7641771, -6.885094], [106.6787811, -6.159693], [106.6790153, -6.159611], [104.4013538, 1.138159], [110.0352457, -7.77666], [112.2749623, -7.266449], [98.8639593, 3.611056], [106.6740524, -6.272698], [107.764795, -6.877711], [110.0390645, -7.784364], [106.6733467, -6.119598], [107.7647834, -6.878934], [107.7655568, -6.882038], [106.6592456, -6.173558], [106.6776836, -6.112217], [106.6693894, -6.181673], [106.6840049, -6.266798], [106.673236, -6.112126], [106.6786601, -6.270199], [106.6938277, -6.37192], [106.6888958, -6.226336], [106.6714402, -6.112346], [107.7659389, -6.943671], [110.038295, -7.764083], [106.6910558, -6.156829], [107.7303879, -6.307383], [106.6930155, -6.251169], [98.8673549, 3.603171], [107.7615936, -6.905217], [98.8663612, 3.59451], [106.6786289, -6.135671], [106.6786601, -6.270199], [106.6843001, -6.384499], [106.6824487, -6.156697], [107.7114717, -6.257121], [106.6856836, -6.230295], [106.660398, -6.152376], [112.2592789, -7.934567], [106.680999, -6.150708], [106.664026, -6.16879], [106.6806801, -6.155186], [107.7574822, -6.934524], [106.6621394, -6.179665], [106.6704937, -6.165326], [106.6688396, -6.150016], [106.6622278, -6.15249], [110.039155, -7.762579], [106.6810748, -6.173311], [110.039752, -7.757982], [112.2462746, 7.47542], [112.2444684, 7.477354], [112.2444684, 7.477354], [112.2431891, 7.477312], [107.7615936, -6.905217], [112.2592789, -7.934567], [110.039155, -7.762579], [98.8673549, 3.603171], [106.6786289, -6.135671], [112.2431891, 7.477312] ];

    group(`get_store_group_by_coordinate`, function () {
        for (const coordinate of coordinates) {
            response = http.get(`http://superapps-api.apps.okd4.okd.stag/store/group?latitude=${coordinate[1]}&longitude=${coordinate[0]}`);
            check_error(response);
            sleep(1);  
        }
    });
}
