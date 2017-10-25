(ns events
  (:require [wisp.runtime :refer [+ - = *]]
            [lodash :refer [partial-right]]))

(def reg-event (.-reg_event (require "./global")))

;; ----------------------------------------------------------------------------
;; N, N -> N
;; increments the given integer by x
(defn increment [n x]
  (+ n x))

;; ----------------------------------------------------------------------------
;; N, N -> N
;; decrements the given integer by x
(defn decrement [n x]
  (- n x))

;; ----------------------------------------------------------------------------
;; State, N? -> State
;; increments the counter by n? if it is passed, 1 otherwise
(defn increment-counter [state n?]
  (let [inc (partial-right increment (if (= n? nil) 1 n?))]
    (.update state :count inc)))

;; ----------------------------------------------------------------------------
;; State, N? -> State
;; decrements the counter by n? if it is passed, 1 otherwise
(defn decrement-counter [state n?]
  (let [dec (partial-right decrement (if (= n? nil) 1 n?))]
    (.update state :count dec)))

(reg-event :increment increment-counter)
(reg-event :decrement decrement-counter)
