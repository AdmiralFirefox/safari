import { FC } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { countriesInstance } from "../../api/countries";
import { Countries } from "../../types/Countries/Countries";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Size } from "../../types/WindowSize/WindowSize";
import { IoCloseCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import styles from "../../styles/modal/LocationModal.module.scss";

interface LocationModalProps {
  locationModal: boolean;
  closeLocationModal: () => void;
  handleCountryChange: (e: SelectChangeEvent) => void;
}

const DoneButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "hsl(50, 100%, 54%)",
  fontWeight: 700,
  height: "2.5em",
  width: "10em",
  "&:hover": {
    backgroundColor: "hsl(50, 100%, 45%)",
  },
}));

const fetchCountries = async () => {
  return await countriesInstance.get("/all");
};

const LocationModal: FC<LocationModalProps> = ({
  closeLocationModal,
  locationModal,
  handleCountryChange,
}) => {
  const size: Size = useWindowSize();
  const isMobile = size.width! < 736;

  const {
    data: countries,
    isLoading,
    isError,
  }: UseQueryResult<Countries, Error> = useQuery<Countries, Error>(
    "countries",
    fetchCountries,
    {
      staleTime: Infinity,
    }
  );

  return (
    <>
      <AnimatePresence initial={false}>
        {locationModal && (
          <>
            <motion.div
              key="locationmodalbackdrop"
              className={styles["location-modal-backdrop"]}
              onClick={closeLocationModal}
              style={{ width: `${size.width}px`, height: `${size.height}px` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              key="contentlocationmodal"
              initial={{
                opacity: 0,
                top: isMobile ? "5%" : "45%",
              }}
              animate={{ opacity: 1, top: isMobile ? "10%" : "50%" }}
              exit={{ opacity: 0, top: isMobile ? "5%" : "45%" }}
              transition={{
                duration: 0.3,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
              className={styles["location-modal-wrapper"]}
              style={{ maxHeight: `calc(${size.height!}px - 10vh)` }}
            >
              <div className={styles["location-modal-content-header"]}>
                <p>Choose your location:</p>

                <div onClick={closeLocationModal}>
                  <IconContext.Provider
                    value={{
                      className: styles["location-modal-close-button"],
                    }}
                  >
                    <IoCloseCircle />
                  </IconContext.Provider>
                </div>
              </div>
              <div className={styles["location-modal-content"]}>
                <p>
                  Delivery options and delivery speeds may vary for different
                  locations:
                </p>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    defaultValue=""
                    onChange={handleCountryChange}
                  >
                    {isLoading ? (
                      <MenuItem value="">Loading...</MenuItem>
                    ) : isError ? (
                      <MenuItem value="">Error Loading Countries...</MenuItem>
                    ) : (
                      countries?.data
                        .sort((a, b) =>
                          a.name.common > b.name.common
                            ? 1
                            : b.name.common > a.name.common
                            ? -1
                            : 0
                        )
                        .map((country, i) => {
                          return (
                            <MenuItem value={country.name.common} key={i}>
                              {country.name.common}
                            </MenuItem>
                          );
                        })
                    )}
                  </Select>
                </FormControl>
                <div className={styles["done-button-wrapper"]}>
                  <DoneButton onClick={closeLocationModal}>Done</DoneButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LocationModal;
