import "./styles.css";
import ForceGraph2D from "react-force-graph-2d";
import React, { useEffect, useState, useCallback } from "react";
import C2S from "canvas2svg";
import tumult from "tumult";

const nodes = [
  { name: "0160190", attr: [231, true, false], id: 2 },
  { name: "0132590", attr: [108, false, false], id: 25191 },
  { name: "0142170", attr: [265, false, false], id: 23298 },
  { name: "0157854", attr: [384, false, false], id: 8956 },
  { name: "0125070", attr: [335, true, false], id: 7 },
  { name: "0130970", attr: [239, false, false], id: 22778 },
  { name: "0119320", attr: [1, true, false], id: 5 },
  { name: "1114070", attr: [6, false, false], id: 8582 },
  { name: "0102890", attr: [760, false, false], id: 1139 },
  { name: "0140880", attr: [80, false, false], id: 22755 },
  { name: "0122810", attr: [223, false, true], id: 10 },
  { name: "0171000", attr: [162, false, false], id: 8383 },
  { name: "0101980", attr: [308, true, false], id: 16 },
  { name: "0147450", attr: [200, false, false], id: 7488 },
  { name: "0144330", attr: [130, false, false], id: 199 },
  { name: "0146290", attr: [451, false, false], id: 9330 },
  { name: "0157080", attr: [189, false, false], id: 1658 },
  { name: "0151020", attr: [21, true, false], id: 8 },
  { name: "0158204", attr: [787, false, false], id: 2944 },
  { name: "1113800", attr: [3, true, false], id: 15 },
  { name: "0108100", attr: [259, false, false], id: 25138 },
  { name: "0140330", attr: [201, false, false], id: 8971 },
  { name: "0141440", attr: [319, false, false], id: 12198 },
  { name: "0155720", attr: [344, false, false], id: 9643 },
  { name: "0151380", attr: [1141, false, false], id: 11864 },
  { name: "0132330", attr: [357, false, false], id: 877 },
  { name: "1141410", attr: [125, false, false], id: 22040 },
  { name: "0123730", attr: [241, false, false], id: 17025 },
  { name: "0134720", attr: [116, false, false], id: 3550 },
  { name: "0145370", attr: [373, false, false], id: 17027 },
  { name: "0139160", attr: [249, true, false], id: 6 },
  { name: "0110410", attr: [117, false, false], id: 4815 },
  { name: "0102040", attr: [269, false, false], id: 11804 },
  { name: "1139820", attr: [88, false, false], id: 5830 },
  { name: "0133450", attr: [1124, false, false], id: 506 },
  { name: "0161920", attr: [243, false, false], id: 24170 },
  { name: "0103164", attr: [188, false, false], id: 2258 },
  { name: "0110520", attr: [324, false, false], id: 13728 },
  { name: "0110570", attr: [293, false, false], id: 7099 },
  { name: "0105730", attr: [823, false, false], id: 22051 },
  { name: "0108170", attr: [145, false, false], id: 5608 },
  { name: "0102820", attr: [834, false, false], id: 11354 },
  { name: "0142000", attr: [226, false, false], id: 13593 },
  { name: "0138920", attr: [672, false, false], id: 3871 },
  { name: "0112540", attr: [379, false, false], id: 8089 },
  { name: "0153420", attr: [770, false, false], id: 736 },
  { name: "0139910", attr: [123, false, false], id: 9534 },
  { name: "0106660", attr: [884, false, false], id: 343 },
  { name: "0108840", attr: [505, false, false], id: 20095 },
  { name: "1125710", attr: [26, false, false], id: 24597 },
  { name: "0115670", attr: [60, false, false], id: 15918 },
  { name: "0106410", attr: [222, false, false], id: 23144 },
  { name: "0138970", attr: [887, false, false], id: 965 },
  { name: "0133190", attr: [455, false, false], id: 11291 },
  { name: "0108490", attr: [419, false, false], id: 10492 },
  { name: "1134450", attr: [42, false, false], id: 20126 },
  { name: "0133370", attr: [193, false, false], id: 20394 },
  { name: "0101280", attr: [235, false, false], id: 24707 },
  { name: "0140150", attr: [422, false, false], id: 3554 },
  { name: "0105490", attr: [927, false, false], id: 15632 },
  { name: "1113930", attr: [16, false, false], id: 6431 },
  { name: "0146620", attr: [21, false, false], id: 12993 },
  { name: "0133680", attr: [120, false, false], id: 21561 },
  { name: "0133080", attr: [617, false, false], id: 15258 },
  { name: "0104240", attr: [361, false, false], id: 9112 },
  { name: "0101332", attr: [1011, false, false], id: 11288 },
  { name: "0109190", attr: [122, false, false], id: 15185 },
  { name: "0133460", attr: [58, false, false], id: 13224 },
  { name: "0115340", attr: [25, false, false], id: 9449 },
  { name: "0103910", attr: [489, false, false], id: 2195 },
  { name: "0124220", attr: [122, false, false], id: 15599 },
  { name: "0162860", attr: [569, false, false], id: 20022 },
  { name: "0115950", attr: [205, false, false], id: 9673 },
  { name: "0102260", attr: [681, false, false], id: 22163 },
  { name: "1136194", attr: [13, false, false], id: 8134 },
  { name: "0103290", attr: [316, false, false], id: 16417 },
  { name: "0121380", attr: [112, false, false], id: 13553 },
  { name: "1139020", attr: [27, false, false], id: 19349 },
  { name: "0141950", attr: [69, false, false], id: 5463 },
  { name: "0147270", attr: [56, false, false], id: 7405 },
  { name: "0105840", attr: [242, false, false], id: 17389 },
  { name: "0138230", attr: [330, false, false], id: 4999 },
  { name: "0103460", attr: [72, false, false], id: 14783 },
  { name: "0119734", attr: [205, false, false], id: 442 },
  { name: "0137490", attr: [90, false, false], id: 15621 },
  { name: "0125310", attr: [407, false, false], id: 24230 },
  { name: "0116920", attr: [1395, false, false], id: 15321 },
  { name: "0107310", attr: [152, false, false], id: 16135 },
  { name: "0103230", attr: [297, false, false], id: 25058 },
  { name: "0102380", attr: [317, false, false], id: 15679 },
  { name: "0134010", attr: [82, false, false], id: 5913 },
  { name: "0152420", attr: [216, false, false], id: 21093 },
  { name: "0134790", attr: [44, false, false], id: 10336 },
  { name: "0157040", attr: [412, false, false], id: 19133 },
  { name: "0152100", attr: [203, false, false], id: 579 },
  { name: "1134062", attr: [13, false, false], id: 24760 },
  { name: "0146270", attr: [253, false, false], id: 17657 },
  { name: "0174190", attr: [509, false, false], id: 1395 },
  { name: "0145010", attr: [160, false, false], id: 16376 },
  { name: "0149380", attr: [137, false, false], id: 14817 },
  { name: "0108560", attr: [1324, false, false], id: 23058 },
  { name: "0120820", attr: [201, false, false], id: 19084 },
  { name: "0139780", attr: [151, false, false], id: 10710 },
  { name: "0105250", attr: [230, false, false], id: 10318 },
  { name: "0149970", attr: [196, false, false], id: 11492 },
  { name: "1102130", attr: [3, true, false], id: 3 },
  { name: "0136150", attr: [126, false, false], id: 4291 },
  { name: "0111830", attr: [799, false, false], id: 8105 },
  { name: "0151500", attr: [414, false, false], id: 916 },
  { name: "0148410", attr: [143, false, false], id: 3675 },
  { name: "0166330", attr: [315, false, false], id: 2623 },
  { name: "0102100", attr: [547, false, false], id: 11326 },
  { name: "0114450", attr: [490, false, false], id: 14705 },
  { name: "0105080", attr: [316, false, false], id: 9023 },
  { name: "0152090", attr: [271, false, false], id: 4946 },
  { name: "0125850", attr: [386, false, false], id: 7353 },
  { name: "1108550", attr: [108, false, false], id: 4923 },
  { name: "0138980", attr: [810, false, false], id: 24671 },
  { name: "0151700", attr: [267, false, false], id: 15235 },
  { name: "0136974", attr: [728, false, false], id: 3630 },
  { name: "0131300", attr: [486, false, false], id: 22911 },
  { name: "0110540", attr: [97, false, false], id: 7576 },
  { name: "0109940", attr: [483, false, false], id: 1152 },
  { name: "0157180", attr: [325, false, false], id: 4372 },
  { name: "0157940", attr: [172, false, false], id: 4670 },
  { name: "0125840", attr: [124, false, false], id: 22168 },
  { name: "0142430", attr: [277, false, false], id: 9686 },
  { name: "0104510", attr: [253, false, false], id: 8228 },
  { name: "0138870", attr: [533, false, false], id: 94 },
  { name: "0125450", attr: [774, false, false], id: 9965 },
  { name: "0124970", attr: [419, false, false], id: 17420 },
  { name: "0150550", attr: [200, false, false], id: 18325 },
  { name: "0153900", attr: [1077, false, false], id: 22314 },
  { name: "1132550", attr: [194, false, false], id: 15433 },
  { name: "0136450", attr: [86, false, false], id: 21350 },
  { name: "0135960", attr: [6, true, false], id: 1 },
  { name: "0148200", attr: [230, false, false], id: 10861 },
  { name: "0112640", attr: [75, false, false], id: 4744 },
  { name: "0125620", attr: [235, false, false], id: 25326 },
  { name: "0147410", attr: [788, false, false], id: 1766 },
  { name: "0130060", attr: [317, false, false], id: 19360 },
  { name: "0104970", attr: [944, false, false], id: 23254 },
  { name: "1136470", attr: [60, false, false], id: 21763 },
  { name: "1101040", attr: [9, true, false], id: 4 },
  { name: "0103770", attr: [198, false, false], id: 24061 },
  { name: "0119954", attr: [117, false, false], id: 4818 },
  { name: "0140950", attr: [638, false, false], id: 16217 },
  { name: "0172980", attr: [368, false, false], id: 17435 },
  { name: "0151590", attr: [624, false, false], id: 4062 },
  { name: "0138060", attr: [26, false, false], id: 9833 },
  { name: "0162420", attr: [740, false, false], id: 20607 },
  { name: "0148850", attr: [602, false, false], id: 22093 },
  { name: "0168940", attr: [1519, false, false], id: 15607 },
  { name: "0122520", attr: [662, false, false], id: 24448 },
  { name: "0163490", attr: [165, false, false], id: 19689 },
  { name: "0101530", attr: [953, false, false], id: 1962 },
  { name: "0131040", attr: [309, false, false], id: 17139 },
  { name: "1128040", attr: [113, false, false], id: 1109 },
  { name: "0108330", attr: [510, false, false], id: 6641 },
  { name: "0132800", attr: [119, false, false], id: 23412 },
  { name: "0130870", attr: [121, false, false], id: 17021 },
  { name: "0106320", attr: [156, false, false], id: 16364 },
  { name: "0132560", attr: [153, false, false], id: 9692 },
  { name: "0110670", attr: [43, false, false], id: 21929 },
  { name: "0148770", attr: [38, false, false], id: 6900 },
  { name: "0101750", attr: [167, false, false], id: 17194 },
  { name: "0166500", attr: [696, false, false], id: 5258 },
  { name: "0132310", attr: [86, false, false], id: 11552 },
  { name: "0163500", attr: [141, false, false], id: 5025 },
  { name: "0123740", attr: [225, false, false], id: 2362 },
  { name: "0107350", attr: [220, false, false], id: 13616 },
  { name: "0148960", attr: [629, false, false], id: 7529 },
  { name: "0101440", attr: [361, false, false], id: 2905 },
  { name: "0124010", attr: [886, false, false], id: 14443 },
  { name: "0107210", attr: [558, false, false], id: 20763 },
  { name: "0150290", attr: [472, false, false], id: 23773 },
  { name: "0132030", attr: [1198, false, false], id: 12500 },
  { name: "0162870", attr: [634, false, false], id: 13685 },
  { name: "1143620", attr: [41, false, false], id: 12726 },
  { name: "0153230", attr: [404, false, false], id: 10547 },
  { name: "0152270", attr: [262, false, false], id: 25677 },
  { name: "1134350", attr: [58, false, false], id: 11239 },
  { name: "0146460", attr: [91, false, false], id: 10677 },
  { name: "0160230", attr: [277, false, false], id: 14668 },
  { name: "0139000", attr: [267, false, false], id: 14469 },
  { name: "0135524", attr: [3, false, true], id: 9 },
  { name: "0102490", attr: [258, false, false], id: 8276 },
  { name: "0144130", attr: [673, false, false], id: 24477 },
  { name: "0148420", attr: [643, false, false], id: 13896 },
  { name: "0109660", attr: [47, false, false], id: 6871 },
  { name: "0152470", attr: [415, false, false], id: 25354 },
  { name: "0105400", attr: [22, false, false], id: 19124 }
];

const links = [
  { source: 2, target: 25191 },
  { source: 2, target: 4815 },
  { source: 2, target: 736 },
  { source: 2, target: 20126 },
  { source: 2, target: 20394 },
  { source: 2, target: 15632 },
  { source: 2, target: 6431 },
  { source: 2, target: 12993 },
  { source: 2, target: 11288 },
  { source: 2, target: 9673 },
  { source: 2, target: 16417 },
  { source: 2, target: 13553 },
  { source: 2, target: 10492 },
  { source: 2, target: 15621 },
  { source: 2, target: 15679 },
  { source: 2, target: 21093 },
  { source: 2, target: 1395 },
  { source: 2, target: 4923 },
  { source: 2, target: 9330 },
  { source: 2, target: 3630 },
  { source: 2, target: 8228 },
  { source: 2, target: 94 },
  { source: 2, target: 22755 },
  { source: 2, target: 23144 },
  { source: 2, target: 23254 },
  { source: 2, target: 21763 },
  { source: 2, target: 19349 },
  { source: 2, target: 9833 },
  { source: 2, target: 19360 },
  { source: 2, target: 20607 },
  { source: 2, target: 7099 },
  { source: 2, target: 16217 },
  { source: 2, target: 10710 },
  { source: 2, target: 11864 },
  { source: 2, target: 4062 },
  { source: 2, target: 7529 },
  { source: 2, target: 8089 },
  { source: 2, target: 19084 },
  { source: 2, target: 17657 },
  { source: 2, target: 17435 },
  { source: 2, target: 10861 },
  { source: 2, target: 22168 },
  { source: 2, target: 15433 },
  { source: 2, target: 442 },
  { source: 2, target: 10547 },
  { source: 2, target: 22163 },
  { source: 2, target: 4818 },
  { source: 2, target: 10677 },
  { source: 2, target: 13728 },
  { source: 2, target: 24707 },
  { source: 2, target: 23773 },
  { source: 2, target: 7576 },
  { source: 2, target: 17139 },
  { source: 2, target: 13224 },
  { source: 2, target: 579 },
  { source: 2, target: 14817 },
  { source: 2, target: 1139 },
  { source: 2, target: 4946 },
  { source: 2, target: 21350 },
  { source: 2, target: 2944 },
  { source: 2, target: 14705 },
  { source: 2, target: 4744 },
  { source: 2, target: 3871 },
  { source: 2, target: 25354 },
  { source: 2, target: 17027 },
  { source: 2, target: 19124 },
  { source: 2, target: 877 },
  { source: 2, target: 5025 },
  { source: 2, target: 7488 },
  { source: 2, target: 25326 },
  { source: 2, target: 6641 },
  { source: 25191, target: 6 },
  { source: 25191, target: 1152 },
  { source: 23298, target: 8956 },
  { source: 23298, target: 16 },
  { source: 23298, target: 8 },
  { source: 8956, target: 25058 },
  { source: 8956, target: 10710 },
  { source: 8956, target: 20763 },
  { source: 8956, target: 10 },
  { source: 8956, target: 11326 },
  { source: 8956, target: 1766 },
  { source: 8956, target: 16417 },
  { source: 8956, target: 16217 },
  { source: 8956, target: 22093 },
  { source: 7, target: 22778 },
  { source: 7, target: 1139 },
  { source: 7, target: 8971 },
  { source: 7, target: 11864 },
  { source: 7, target: 3550 },
  { source: 7, target: 11804 },
  { source: 7, target: 3871 },
  { source: 7, target: 20095 },
  { source: 7, target: 4999 },
  { source: 7, target: 11354 },
  { source: 7, target: 15185 },
  { source: 7, target: 20126 },
  { source: 7, target: 8383 },
  { source: 7, target: 22911 },
  { source: 7, target: 4670 },
  { source: 7, target: 5463 },
  { source: 7, target: 94 },
  { source: 7, target: 1766 },
  { source: 7, target: 16217 },
  { source: 7, target: 16417 },
  { source: 7, target: 22040 },
  { source: 7, target: 4946 },
  { source: 7, target: 20022 },
  { source: 7, target: 4062 },
  { source: 7, target: 17021 },
  { source: 7, target: 21929 },
  { source: 7, target: 11326 },
  { source: 7, target: 20763 },
  { source: 7, target: 23773 },
  { source: 7, target: 3630 },
  { source: 7, target: 22093 },
  { source: 7, target: 11239 },
  { source: 7, target: 14783 },
  { source: 7, target: 23058 },
  { source: 7, target: 12500 },
  { source: 7, target: 9449 },
  { source: 7, target: 22314 },
  { source: 7, target: 24477 },
  { source: 7, target: 13685 },
  { source: 7, target: 11291 },
  { source: 7, target: 7405 },
  { source: 7, target: 8105 },
  { source: 7, target: 1109 },
  { source: 7, target: 20394 },
  { source: 7, target: 5830 },
  { source: 7, target: 343 },
  { source: 7, target: 14668 },
  { source: 7, target: 19084 },
  { source: 7, target: 442 },
  { source: 7, target: 14443 },
  { source: 7, target: 11552 },
  { source: 7, target: 16364 },
  { source: 7, target: 4818 },
  { source: 7, target: 1658 },
  { source: 7, target: 5608 },
  { source: 7, target: 15621 },
  { source: 7, target: 19689 },
  { source: 22778, target: 5608 },
  { source: 22778, target: 16 },
  { source: 22778, target: 6 },
  { source: 22778, target: 10 },
  { source: 22778, target: 9673 },
  { source: 5, target: 8582 },
  { source: 8582, target: 4372 },
  { source: 8582, target: 16 },
  { source: 1139, target: 10 },
  { source: 22755, target: 10 },
  { source: 10, target: 24170 },
  { source: 10, target: 8134 },
  { source: 10, target: 442 },
  { source: 10, target: 15321 },
  { source: 10, target: 17657 },
  { source: 10, target: 8105 },
  { source: 10, target: 3675 },
  { source: 10, target: 24671 },
  { source: 10, target: 15235 },
  { source: 10, target: 4372 },
  { source: 10, target: 15433 },
  { source: 10, target: 17389 },
  { source: 10, target: 23058 },
  { source: 10, target: 2944 },
  { source: 10, target: 4291 },
  { source: 10, target: 6641 },
  { source: 10, target: 23412 },
  { source: 10, target: 506 },
  { source: 10, target: 22040 },
  { source: 10, target: 12198 },
  { source: 10, target: 12726 },
  { source: 10, target: 23254 },
  { source: 10, target: 25677 },
  { source: 10, target: 20095 },
  { source: 10, target: 8276 },
  { source: 10, target: 15607 },
  { source: 10, target: 13593 },
  { source: 10, target: 199 },
  { source: 10, target: 9686 },
  { source: 10, target: 9023 },
  { source: 10, target: 1152 },
  { source: 10, target: 17420 },
  { source: 10, target: 15258 },
  { source: 10, target: 24760 },
  { source: 10, target: 24448 },
  { source: 10, target: 7353 },
  { source: 10, target: 19084 },
  { source: 10, target: 2195 },
  { source: 10, target: 13896 },
  { source: 10, target: 19133 },
  { source: 10, target: 6900 },
  { source: 8383, target: 16 },
  { source: 8383, target: 15321 },
  { source: 16, target: 9330 },
  { source: 16, target: 2944 },
  { source: 16, target: 12198 },
  { source: 16, target: 9643 },
  { source: 16, target: 17025 },
  { source: 16, target: 7099 },
  { source: 16, target: 22051 },
  { source: 16, target: 736 },
  { source: 16, target: 9534 },
  { source: 16, target: 15918 },
  { source: 16, target: 23144 },
  { source: 16, target: 10492 },
  { source: 16, target: 24707 },
  { source: 16, target: 15185 },
  { source: 16, target: 13224 },
  { source: 16, target: 22163 },
  { source: 16, target: 5463 },
  { source: 16, target: 3550 },
  { source: 16, target: 24230 },
  { source: 16, target: 16376 },
  { source: 16, target: 10710 },
  { source: 16, target: 11326 },
  { source: 16, target: 15632 },
  { source: 16, target: 7405 },
  { source: 16, target: 15235 },
  { source: 16, target: 965 },
  { source: 16, target: 25326 },
  { source: 16, target: 12993 },
  { source: 16, target: 17435 },
  { source: 16, target: 24061 },
  { source: 16, target: 21350 },
  { source: 16, target: 22093 },
  { source: 16, target: 10336 },
  { source: 16, target: 916 },
  { source: 16, target: 1962 },
  { source: 16, target: 11492 },
  { source: 16, target: 15599 },
  { source: 16, target: 1766 },
  { source: 16, target: 17194 },
  { source: 16, target: 9965 },
  { source: 16, target: 25058 },
  { source: 16, target: 9833 },
  { source: 16, target: 11552 },
  { source: 16, target: 2362 },
  { source: 16, target: 2905 },
  { source: 16, target: 11804 },
  { source: 16, target: 25138 },
  { source: 16, target: 1109 },
  { source: 16, target: 8105 },
  { source: 16, target: 4815 },
  { source: 16, target: 12500 },
  { source: 16, target: 23254 },
  { source: 16, target: 14817 },
  { source: 16, target: 15433 },
  { source: 16, target: 20095 },
  { source: 16, target: 14668 },
  { source: 16, target: 5258 },
  { source: 16, target: 9449 },
  { source: 16, target: 19689 },
  { source: 16, target: 8134 },
  { source: 16, target: 24477 },
  { source: 16, target: 11288 },
  { source: 16, target: 11239 },
  { source: 16, target: 8971 },
  { source: 16, target: 5913 },
  { source: 16, target: 24597 },
  { source: 16, target: 20763 },
  { source: 16, target: 22911 },
  { source: 16, target: 11354 },
  { source: 16, target: 9112 },
  { source: 16, target: 4999 },
  { source: 16, target: 18325 },
  { source: 16, target: 5830 },
  { source: 16, target: 17021 },
  { source: 16, target: 25354 },
  { source: 16, target: 9692 },
  { source: 16, target: 2623 },
  { source: 16, target: 16135 },
  { source: 16, target: 13616 },
  { source: 16, target: 23058 },
  { source: 16, target: 20607 },
  { source: 16, target: 14469 },
  { source: 16, target: 14783 },
  { source: 16, target: 17657 },
  { source: 16, target: 22040 },
  { source: 16, target: 4670 },
  { source: 16, target: 6641 },
  { source: 16, target: 22314 },
  { source: 16, target: 15679 },
  { source: 16, target: 3554 },
  { source: 16, target: 10318 },
  { source: 16, target: 20022 },
  { source: 16, target: 13685 },
  { source: 7488, target: 199 },
  { source: 7488, target: 6 },
  { source: 199, target: 13553 },
  { source: 9330, target: 13593 },
  { source: 1658, target: 8 },
  { source: 1658, target: 23412 },
  { source: 8, target: 21561 },
  { source: 8, target: 1962 },
  { source: 15, target: 25138 },
  { source: 15, target: 2258 },
  { source: 15, target: 343 },
  { source: 15, target: 12198 },
  { source: 15, target: 11291 },
  { source: 15, target: 5608 },
  { source: 15, target: 21929 },
  { source: 15, target: 10547 },
  { source: 15, target: 9643 },
  { source: 15, target: 10336 },
  { source: 15, target: 19124 },
  { source: 15, target: 14443 },
  { source: 25138, target: 12198 },
  { source: 8971, target: 9686 },
  { source: 9643, target: 22040 },
  { source: 11864, target: 13593 },
  { source: 877, target: 22040 },
  { source: 877, target: 6 },
  { source: 22040, target: 13728 },
  { source: 22040, target: 24597 },
  { source: 22040, target: 3554 },
  { source: 22040, target: 9112 },
  { source: 22040, target: 20022 },
  { source: 22040, target: 19349 },
  { source: 22040, target: 6431 },
  { source: 22040, target: 7099 },
  { source: 22040, target: 2623 },
  { source: 22040, target: 17027 },
  { source: 22040, target: 22168 },
  { source: 22040, target: 4923 },
  { source: 22040, target: 11492 },
  { source: 22040, target: 19360 },
  { source: 22040, target: 10318 },
  { source: 22040, target: 3871 },
  { source: 22040, target: 13616 },
  { source: 22040, target: 3550 },
  { source: 22040, target: 16376 },
  { source: 22040, target: 11288 },
  { source: 22040, target: 5913 },
  { source: 22040, target: 17025 },
  { source: 22040, target: 14469 },
  { source: 22040, target: 916 },
  { source: 22040, target: 1962 },
  { source: 22040, target: 2905 },
  { source: 22040, target: 9534 },
  { source: 22040, target: 6 },
  { source: 22040, target: 5258 },
  { source: 22040, target: 8089 },
  { source: 17025, target: 6 },
  { source: 17027, target: 6 },
  { source: 6, target: 8089 },
  { source: 6, target: 965 },
  { source: 6, target: 736 },
  { source: 6, target: 13728 },
  { source: 6, target: 16135 },
  { source: 6, target: 5913 },
  { source: 6, target: 19084 },
  { source: 6, target: 10318 },
  { source: 6, target: 22163 },
  { source: 6, target: 11492 },
  { source: 6, target: 916 },
  { source: 6, target: 24597 },
  { source: 6, target: 7576 },
  { source: 6, target: 1152 },
  { source: 6, target: 8228 },
  { source: 6, target: 18325 },
  { source: 6, target: 9112 },
  { source: 6, target: 9673 },
  { source: 6, target: 10861 },
  { source: 6, target: 4744 },
  { source: 6, target: 21561 },
  { source: 6, target: 3554 },
  { source: 6, target: 21093 },
  { source: 6, target: 16376 },
  { source: 6, target: 9692 },
  { source: 6, target: 1395 },
  { source: 6, target: 5258 },
  { source: 6, target: 5025 },
  { source: 6, target: 7529 },
  { source: 6, target: 14817 },
  { source: 6, target: 9534 },
  { source: 6, target: 15235 },
  { source: 6, target: 24061 },
  { source: 6, target: 19349 },
  { source: 6, target: 22168 },
  { source: 6, target: 14469 },
  { source: 6, target: 10547 },
  { source: 6, target: 24230 },
  { source: 6, target: 17194 },
  { source: 6, target: 22911 },
  { source: 6, target: 21763 },
  { source: 6, target: 2362 },
  { source: 6, target: 2623 },
  { source: 6, target: 2905 },
  { source: 6, target: 17139 },
  { source: 6, target: 4923 },
  { source: 6, target: 25058 },
  { source: 6, target: 8134 },
  { source: 6, target: 579 },
  { source: 6, target: 15918 },
  { source: 6, target: 6431 },
  { source: 6, target: 14705 },
  { source: 6, target: 19360 },
  { source: 6, target: 9965 },
  { source: 6, target: 13553 },
  { source: 6, target: 10677 },
  { source: 6, target: 15599 },
  { source: 6, target: 13616 },
  { source: 4815, target: 8134 },
  { source: 11804, target: 16364 },
  { source: 11804, target: 506 },
  { source: 5830, target: 506 },
  { source: 506, target: 11291 },
  { source: 506, target: 15599 },
  { source: 506, target: 4999 },
  { source: 506, target: 17139 },
  { source: 506, target: 14443 },
  { source: 506, target: 13685 },
  { source: 506, target: 15918 },
  { source: 506, target: 736 },
  { source: 506, target: 7576 },
  { source: 506, target: 22163 },
  { source: 506, target: 965 },
  { source: 24170, target: 4744 },
  { source: 2258, target: 1 },
  { source: 2258, target: 15607 },
  { source: 22051, target: 4 },
  { source: 22051, target: 13593 },
  { source: 11354, target: 13593 },
  { source: 13593, target: 10492 },
  { source: 13593, target: 13224 },
  { source: 13593, target: 14705 },
  { source: 13593, target: 22314 },
  { source: 13593, target: 15632 },
  { source: 13593, target: 343 },
  { source: 13593, target: 3630 },
  { source: 13593, target: 94 },
  { source: 13593, target: 1109 },
  { source: 13593, target: 20394 },
  { source: 13593, target: 8228 },
  { source: 13593, target: 23773 },
  { source: 13593, target: 12500 },
  { source: 13593, target: 10547 },
  { source: 13593, target: 18325 },
  { source: 13593, target: 4062 },
  { source: 13593, target: 20607 },
  { source: 13593, target: 2362 },
  { source: 13593, target: 15679 },
  { source: 13593, target: 22911 },
  { source: 20095, target: 16364 },
  { source: 23144, target: 17420 },
  { source: 20126, target: 13896 },
  { source: 24707, target: 23058 },
  { source: 12993, target: 9023 },
  { source: 21561, target: 15258 },
  { source: 15185, target: 9686 },
  { source: 9449, target: 2195 },
  { source: 8134, target: 15621 },
  { source: 5463, target: 8276 },
  { source: 7405, target: 17389 },
  { source: 17389, target: 14783 },
  { source: 17389, target: 4670 },
  { source: 17389, target: 17021 },
  { source: 24230, target: 7353 },
  { source: 16135, target: 1152 },
  { source: 21093, target: 24760 },
  { source: 10336, target: 19133 },
  { source: 579, target: 24760 },
  { source: 24760, target: 4818 },
  { source: 24760, target: 17435 },
  { source: 1395, target: 1152 },
  { source: 14817, target: 23058 },
  { source: 23058, target: 16364 },
  { source: 3, target: 4291 },
  { source: 3, target: 6871 },
  { source: 3675, target: 19689 },
  { source: 4946, target: 7353 },
  { source: 7353, target: 24061 },
  { source: 7353, target: 24477 },
  { source: 24671, target: 9692 },
  { source: 1152, target: 21350 },
  { source: 4372, target: 10861 },
  { source: 4372, target: 17194 },
  { source: 4372, target: 7529 },
  { source: 4372, target: 10677 },
  { source: 9686, target: 14668 },
  { source: 9686, target: 5025 },
  { source: 9965, target: 17420 },
  { source: 17420, target: 21763 },
  { source: 17420, target: 25354 },
  { source: 1, target: 4062 },
  { source: 1, target: 6871 },
  { source: 25326, target: 6900 },
  { source: 9833, target: 24448 },
  { source: 24448, target: 19124 },
  { source: 16364, target: 9 },
  { source: 16364, target: 5258 },
  { source: 16364, target: 2905 },
  { source: 21929, target: 6900 },
  { source: 11552, target: 12726 },
  { source: 25677, target: 11239 }
];
const canvasSketch = require("canvas-sketch");
const svg33 = require("./canvas-to-svg.js");

export default function App() {
  const test = document.getElementsByClassName(".force-graph-container"); //.getContext("2d").getSVG(); ;

  const Context = new C2S(800, 600);
  const piedata3 = [["chr Name", "Counts"]];
  const chrum = [
    "Chr 1",
    "Chr 2",
    "Chr 3",
    "Chr 4",
    "Chr 5",
    "Chr 6",
    "Chr 7",
    "Chr 8",
    "Chr 9",
    "Chr 10",
    "Chr 11",
    "Chr 12"
  ];
  chrum.map((a, i) => {
    piedata3.push([a, 1]);
  });
  console.log(piedata3);
  const [data2, setData2] = useState({ nodes: [], links: [] });
  const size = 320;

  let svgCtx = new C2S(size, size);
  useEffect(() => {
    const testnodes = new Set();
    const testlinks = [].concat.apply(
      [],
      links.map((r) => {
        const r2ck = r[2] != null ? String(r[2]).split(",") : [];
        const links = [r].map((a, i) => {
          let source = String(a["source"]);
          let target = String(a["target"]);
          testnodes.add(source);
          testnodes.add(target);
          return { source, target };
        });

        return links;
      })
    );
    const testnodes2 = Array.from(testnodes).map((name2, i) => {
      const getnodesinfo = nodes
        .filter((id3) => id3.id == parseInt(name2))
        .map((a, i) => {
          return [a.id, a.name, a.attr[0], a.attr[1], a.attr[2]];
        });

      const id = String(getnodesinfo[0][0]);
      const name = getnodesinfo[0][1];
      const size = getnodesinfo[0][2];
      const search = getnodesinfo[0][3];
      const targetout = getnodesinfo[0][4];
      return { name, id, size, search, targetout };
    });
    setData2({ nodes: testnodes2, links: testlinks });
  }, []);
  const handleCanvasClick = (node) => {
    console.log(node);
    console.log(1);
  };
  const pathes = [
    {
      a: Math.PI / 4,
      color: "white"
    },
    {
      a: Math.PI / 1.5,
      color: "cyan"
    },
    {
      a: Math.PI,
      color: "violet"
    },
    {
      a: Math.PI * 2,
      color: "gray"
    }
  ];
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);
  const [hover, sethover] = useState([]);
  const [hovertest, sethovertest] = useState(null);
  const [getstate, setgetstate] = useState({});
  //  const [hovertest, sethovertest] = useState(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };
  const handleClick = useCallback((node) => {
    const appendname = hover.push(node.name);
    sethover(appendname);
  }, []);
  function circle(ctx, x, y, r, f1, f2) {
    ctx.beginPath();
    ctx.strokeStyle = "orange";

    const start = 0;
    ctx.arc(x, y, r, start, Math.PI * f1 * 2);
    ctx.stroke();

    ctx.strokeStyle = "purple";
    ctx.beginPath();
    const start1 = Math.PI * f1 * 2;
    ctx.arc(x, y, r, start1, start1 + Math.PI * f2 * 2);
    ctx.stroke();

    ctx.strokeStyle = "green";
    ctx.beginPath();
    const start2 = start + Math.PI * f2 * 2;
    ctx.arc(x, y, r, start2, Math.PI * 2);
    ctx.stroke();
  }

  const data3 = [];
  const nodePaint = useCallback(
    ({ name, x, y, size }, color, ctx, node) => {
      ctx.fillStyle = node === hoverNode ? "orange" : color;
      const label = name;
      const fontSize = 12 / 1;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(label, x, y + 15);
      //    ctx.arc(x,y, node.size/30, 0, 0.8 * Math.PI, false);

      circle(ctx, x, y, 5, 1 / 5, 1 / 3);
      // use i directly as it is already in radians, draw only a small segment

      // remember to use PI (it makes it easier at least)

      ctx.fill();

      drawsvg(node, color, node);
    },
    [hoverNode]
  );
  const context33 = new C2S(800, 800);
  const drawsvg = ({ name, x, y, size }, color, node) => {
    context33.fillStyle = color;
    const label = name;
    const fontSize = 12 / 1;
    context33.font = `${fontSize}px Sans-Serif`;
    context33.textAlign = "center";
    context33.textBaseline = "middle";

    context33.fillText(label, x, y + 15);

    circle(context33, x, y, 5, 1 / 5, 1 / 3);
    context33.fill();
  };
  function chosencolor(node) {
    const nodename = node.name;

    const chosencolorvalue = "gray";
    return chosencolorvalue;
  }
  const getColor = (n) =>
    n.search == true ? "red" : n.targetout == true ? "blue" : chosencolor(n); //node.color;

  /*
     const paintRing = useCallback((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
        ctx.fill();
      }, [hoverNode]);
    */
  /*
  function downloadImage(data, filename = "untitled.jpeg") {
    var a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }*/
  var svg2 = new Image();
  let triggerDownload = (imgURI, fileName) => {
    let a = document.createElement("a");

    a.setAttribute("download", "image.svg");
    a.setAttribute("href", imgURI);
    a.setAttribute("target", "_blank");

    a.click();
  };

  let save = () => {
    const mySerializedSVG = context33.getSerializedSvg();
    console.log(mySerializedSVG);
    console.log(context33);
    //   let svgBlob = new Blob([mySerializedSVG], {
    //    type: "image/svg+xml;charset=utf-8"
    //   });
    //let url = URL.createObjectURL(svgBlob);
    //  setTimeout(function () {
    //     triggerDownload(url);
    //   }, 2000);
  };

  let btn = document.querySelector("button");

  btn && btn.addEventListener("click", save, false);
  return (
    <div className="App">
      <div id="forcegraph2d" onClick={handleCanvasClick(data2)}></div>
      <ForceGraph2D
        graphData={data2}
        nodeId="id"
        nodeLabel=""
        nodeRelSize={10}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowLength={2}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        nodeCanvasObject={(node, ctx) =>
          nodePaint(node, getColor(node), ctx, node)
        }
        nodePointerAreaPaint={nodePaint}
        onNodeHover={handleNodeHover}
        onNodeClick={handleClick}

        //onNodeClick={handleClick}
      />
      <button>Save to SVG</button>
    </div>
  );
}

/*
 
*/
