import { React }  from '../../../modules/commonModules.js'
const useState = React.useState;
import * as webpackModules from '../../../modules/webpackModules.js'
const FormTitle = webpackModules.findByDisplayName("FormTitle");
const FormSection = webpackModules.findByDisplayName("FormSection");
const Flex = webpackModules.findByDisplayName("Flex");
const Header = webpackModules.findByDisplayName("Header");
const Text = webpackModules.findByDisplayName("Text");
const FormDivider = webpackModules.findByDisplayName("FormDivider");

export default () => {
  const [input, setInput] = useState("");
//   const [plugins, setPlugins] = useState(Object.keys(SC.plugins.pluginCache));

//   const updatePlugins = () => {
//     setPlugins(Object.keys(SC.plugins.pluginCache));
//   };

  return (
    <FormSection>
      <FormTitle tag="h1">Information</FormTitle>
      <Flex basis="auto" grow={1} shrink={1}>
      <Header className="cumcord-card-title">
        SmartCord 2.0
        NULL plugins loaded
        NULL themes loaded
      </Header>
      </Flex>
      <FormDivider className="SmartCord-plugin-divider" />
    </FormSection>
  );
};